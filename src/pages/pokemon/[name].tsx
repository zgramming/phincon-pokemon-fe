import { MainLayout } from '@/components/MainLayout';
import { PokemonRepository } from '@/repository/pokemon.repository';
import { Badge, Button, Card, Flex, Grid, LoadingOverlay, Stack, Tooltip } from '@mantine/core';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function Page() {
  const {
    query: { name },
  } = useRouter();

  const [showMoreMoves, setShowMoreMoves] = useState(false);

  const { data: pokemon, isLoading } = useSWR([name ? '/pokemon' : undefined, name], ([url, name]) =>
    PokemonRepository.actions.getDetailPokemonWithSpecies({
      name: name as string,
      url,
    }),
  );

  const decimeterToMeter = (decimeter?: number) => {
    if (!decimeter) {
      return 0;
    }

    const conversionRate = 0.1;
    return (decimeter * conversionRate).toFixed(2);
  };

  const hectogramToKilogram = (hectogram?: number) => {
    if (!hectogram) {
      return 0;
    }

    const conversionRate = 0.1;
    return (hectogram * conversionRate).toFixed(2);
  };

  const onClickShowMoreMoves = () => {
    setShowMoreMoves((prev) => !prev);
  };

  useEffect(() => {
    if (pokemon) {
      console.log(pokemon);
    }
  }, [pokemon]);

  const englishGenera = pokemon?.species?.genera.find((item) => item.language.name === 'en');

  return (
    <MainLayout>
      <LoadingOverlay visible={isLoading} />
      <Card shadow="md" padding="lg" radius="lg" className="m-2" withBorder>
        <Stack gap={'lg'}>
          <Flex gap={'md'} direction={'column'} align={'center'} justify={'center'}>
            <div className="text-2xl font-bold text-center">
              {pokemon?.id} - {pokemon?.name}
            </div>
            <Badge color="blue" variant="filled">
              {englishGenera?.genus}
            </Badge>
            <div className="relative flex justify-center items-center">
              <div className="w-52 h-52">
                <Image
                  alt={pokemon?.name ?? 'pokemon'}
                  src={pokemon?.sprites?.other?.['official-artwork'].front_default ?? ''}
                  objectFit="cover"
                  fill
                />
              </div>
            </div>
            <Grid gutter={'sm'} className="w-full">
              {/* Height */}
              <Grid.Col span={3}>
                <div className="font-bold text-base text-right">Height</div>
              </Grid.Col>
              <Grid.Col span={9}>
                <div className="text-base text-left font-medium">{`${decimeterToMeter(pokemon?.height)} m`}</div>
              </Grid.Col>

              {/* Weight */}
              <Grid.Col span={3}>
                <div className="font-bold text-base text-right">Weight</div>
              </Grid.Col>

              <Grid.Col span={9}>
                <div className="text-base text-left font-medium">{`${hectogramToKilogram(pokemon?.weight)} kg`}</div>
              </Grid.Col>

              {/* Ability */}
              <Grid.Col span={3}>
                <div className="font-bold text-base text-right">Ability</div>
              </Grid.Col>

              <Grid.Col span={9}>
                <div className="text-base text-left font-medium">
                  {pokemon?.abilities.map((ability) => ability.ability.name).join(', ')}
                </div>
              </Grid.Col>

              {/* Moves */}
              <Grid.Col span={3}>
                <div className="font-bold text-base text-right">Moves</div>
              </Grid.Col>

              <Grid.Col span={9}>
                <div
                  className={`text-base text-left font-medium 
                  cursor-pointer
                  ${!showMoreMoves && 'line-clamp-1'}`}
                  onClick={onClickShowMoreMoves}
                >
                  {pokemon?.moves.map((move) => move.move.name).join(', ')}
                </div>
              </Grid.Col>

              {/* Types */}
              <Grid.Col span={3}>
                <div className="font-bold text-base text-right">Types</div>
              </Grid.Col>

              <Grid.Col span={9}>
                <Flex align={'center'} direction={'row'} wrap={'wrap'} gap={'xs'}>
                  {pokemon?.types.map((type) => {
                    return (
                      <div key={type.type.name} className="relative flex items-center justify-center ">
                        <Tooltip label={type.type.name.toUpperCase()}>
                          <div className="h-6 w-6 lg:h-10 lg:w-10">
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
              </Grid.Col>
            </Grid>
            <Button
              leftSection={
                <div className="relative flex items-center justify-center">
                  <div className="h-6 w-6 lg:h-10 lg:w-10">
                    <Image src={`/logo.png`} alt={'pokeball'} objectFit="contain" fill />
                  </div>
                </div>
              }
              variant="filled"
              color="grape"
              size="lg"
              fullWidth
            >
              Catch Pokemon
            </Button>
          </Flex>
        </Stack>
      </Card>
    </MainLayout>
  );
}
