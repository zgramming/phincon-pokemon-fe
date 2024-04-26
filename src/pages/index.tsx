import { MainLayout } from '@/components/MainLayout';
import { PokemonDetailInterface } from '@/interfaces/pokemon-detail.interface';
import { PokemonResult } from '@/interfaces/pokemon.interface';
import { PokemonRepository } from '@/repository/pokemon.repository';
import { useMyPokemonStore } from '@/store/my-pokemon.store';
import { Button, Card, Flex, Grid, Group, LoadingOverlay, Stack, Text, Tooltip } from '@mantine/core';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

interface PokemonItemProps {
  item?: PokemonDetailInterface;
}

const PokemonItem = ({ item }: PokemonItemProps) => {
  const { isAlreadyCaught } = useMyPokemonStore((state) => state);
  const { push } = useRouter();

  if (!item) return null;

  return (
    <>
      <Grid.Col
        key={item.name}
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
          style={{
            // transition: 'all 0.3s',
            border: `${isAlreadyCaught(item?.id) ? '2px solid #f44336' : '2px solid #f9fafb'}`,
          }}
          onClick={() => {
            push(`/pokemon/${item.name}`);
          }}
        >
          <Card.Section>
            <div className="relative flex items-center justify-center">
              <div
                className="h-14 w-14 lg:h-20 lg:w-20
    "
              >
                <Image
                  src={item.sprites.other?.dream_world.front_default ?? ''}
                  alt={item.name}
                  objectFit="contain"
                  fill
                />
              </div>
            </div>
          </Card.Section>

          <Group justify="center" mt="md" mb="xs">
            <Text fw={500}>{item.name.toUpperCase()}</Text>
          </Group>

          <Flex align={'center'} direction={'row'} wrap={'wrap'} gap={'xs'}>
            {item.types.map((type) => {
              return (
                <div key={type.type.name} className="relative flex items-center justify-center ">
                  <Tooltip label={type.type.name.toUpperCase()}>
                    <div className="h-5 w-5 lg:h-8 lg:w-8">
                      <Image
                        src={`/pokemon-type/${type.type.name}.png`}
                        alt={type.type.name}
                        objectFit="contain"
                        fill
                      />
                    </div>
                  </Tooltip>
                </div>
              );
            })}
          </Flex>
        </Card>
      </Grid.Col>
    </>
  );
};

export default function Home() {
  const [queryParam, setQueryParam] = useState({
    limit: 10,
    offset: 0,
  });

  const [pokemons = [], setPokemons] = useState<PokemonResult[]>([]);

  const { data, isLoading, isValidating } = useSWR(
    ['/pokemon', queryParam.limit, queryParam.offset],
    ([url, limit, offset]) => {
      return PokemonRepository.fetch.getPokemon({ url, limit, offset });
    },
  );

  const onLoadMore = () => {
    setQueryParam((prev) => {
      return {
        ...prev,
        limit: prev.limit + 10,
        offset: prev.offset + 10,
      };
    });
  };

  useEffect(() => {
    if (data?.results) {
      setPokemons((prev) => {
        const isExist = prev.find((item) => item.name === data.results[0].name);
        if (!isExist) {
          return [...prev, ...data.results];
        }
        return [...prev];
      });
    }
  }, [data?.results]);

  return (
    <>
      <Head>
        <title>Pokemon</title>
        <meta name="description" content="Pokemon" />
      </Head>
      <MainLayout>
        <Stack gap={'lg'}>
          <LoadingOverlay visible={isLoading || isValidating} />
          <Grid
            gutter={20}
            p={{
              xs: 'sm',
              lg: 'xl',
            }}
          >
            {pokemons.map((item) => {
              return <PokemonItem key={item.name} item={item.detail} />;
            })}
          </Grid>
          <Group justify="center" mb={'lg'}>
            <Button disabled={isValidating || isLoading} onClick={onLoadMore}>
              Load More
            </Button>
          </Group>
        </Stack>
      </MainLayout>
    </>
  );
}
