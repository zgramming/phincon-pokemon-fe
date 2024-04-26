import { MainLayout } from '@/components/MainLayout';
import ModalRenamePokemon from '@/components/ModalRenamePokemon';
import { MyPokemonInterface } from '@/interfaces/my-pokemon.interface';
import { MyPokemonRepository } from '@/repository/my-pokemon.repository';
import { useMyPokemonStore } from '@/store/my-pokemon.store';
import { Button, Card, Flex, Grid, Group, Stack, Text, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

interface MyPokemonProps {
  item: MyPokemonInterface;
}

const MyPokemon = ({ item }: MyPokemonProps) => {
  const { releasePokemon } = useMyPokemonStore((state) => state);

  const [isOpenModalRename, { open: openModalRename, close: closeModalRename }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(false);

  const onOpenModalRename = () => {
    openModalRename();
  };

  const onCloseModalRename = () => {
    closeModalRename();
  };

  const onReleasePokemon = async () => {
    try {
      setIsLoading(true);

      // Give a delay to show the loading state
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const result = await MyPokemonRepository.action.releasePokemon(item.nickname);

      if (!result.data) {
        notifications.show({
          title: 'Failed to release pokemon 🤕',
          message: result.message,
          color: 'red',
        });

        return;
      }

      notifications.show({
        title: 'Yeay 🎉',
        message: result.message,
        color: 'green',
      });

      releasePokemon(item.id);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const onRenamePokemon = async () => {
    onOpenModalRename();
  };

  const isSameName = item.originalName === item.nickname;
  return (
    <>
      <Grid.Col
        key={item.originalName}
        span={{
          xs: 6,
          sm: 6,
          md: 4,
          lg: 3,
        }}
      >
        <Card
          shadow="sm"
          radius="md"
          pt={'xl'}
          withBorder
          className="
                  cursor-pointer transition-all
                  hover:shadow-lg hover:scale-125 hover:z-10 
                  "
        >
          <Card.Section>
            <div className="relative flex items-center justify-center">
              <div
                className="h-14 w-14 lg:h-20 lg:w-20
                    "
              >
                <Image src={item.image_url} alt={item.originalName} objectFit="contain" fill />
              </div>
            </div>
          </Card.Section>

          <Group justify="center" mt="md" mb="xs">
            {isSameName && (
              <Tooltip label="You haven't rename your pokemon">
                <Text fw={500} size="md">
                  {item.nickname}
                </Text>
              </Tooltip>
            )}

            {!isSameName && (
              <Text fw={500} size="md">
                {`${item.originalName} aka (${item.nickname})`}
              </Text>
            )}
          </Group>

          <Flex align={'center'} direction={'row'} wrap={'wrap'} gap={'xs'}>
            {item.types.map((type) => {
              return (
                <div key={type} className="relative flex items-center justify-center ">
                  <Tooltip label={type.toUpperCase()}>
                    <div className="h-5 w-5 lg:h-8 lg:w-8">
                      <Image src={`/pokemon-type/${type}.png`} alt={type} objectFit="contain" fill />
                    </div>
                  </Tooltip>
                </div>
              );
            })}
          </Flex>

          <Group mt="md" align="center" justify="center" gap={'md'}>
            <Button loading={isLoading} onClick={onRenamePokemon}>
              Rename
            </Button>

            <Button loading={isLoading} onClick={onReleasePokemon} color="red">
              Release
            </Button>
          </Group>
        </Card>
      </Grid.Col>
      <ModalRenamePokemon
        isOpen={isOpenModalRename}
        onClose={onCloseModalRename}
        pokemon={{
          id: item.id,
          image_url: item.image_url,
          name: item.nickname,
          types: item.types,
        }}
        onlyRename={true}
      />
    </>
  );
};

export default function Home() {
  const { items } = useMyPokemonStore((state) => state);

  return (
    <>
      <Head>
        <title>Pokemon</title>
        <meta name="description" content="Pokemon" />
      </Head>
      <MainLayout>
        <Stack gap={'lg'}>
          <div className="text-2xl font-bold text-gray-800 text-center my-5">
            My Collection Pokemon ({items.length})
          </div>
          <Grid
            gutter={20}
            p={{
              xs: 'sm',
              lg: 'xl',
            }}
          >
            {items.map((item) => {
              return <MyPokemon key={item.id} item={item} />;
            })}
          </Grid>
        </Stack>
      </MainLayout>
    </>
  );
}
