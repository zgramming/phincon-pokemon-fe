import { PokemonDetailInterface } from '@/interfaces/pokemon-detail.interface';
import { MyPokemonRepository } from '@/repository/my-pokemon.repository';
import { useMyPokemonStore } from '@/store/my-pokemon.store';
import { Modal, Stack, TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';

interface ModalRenamePokemonProps {
  pokemon: {
    id: number;
    name: string;
    types: string[];
    image_url: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onlyRename?: boolean;
}
const ModalRenamePokemon = ({ isOpen, onClose, pokemon, onlyRename = false }: ModalRenamePokemonProps) => {
  const {
    findPokemon,
    catchPokemon: catchPokemonAction,
    renamePokemon: renamePokemonAction,
  } = useMyPokemonStore((state) => state);

  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      name: '',
    },
    validate: {
      name: (value) => {
        if (value.length < 3) {
          return 'Nickname must be at least 3 characters long';
        }
        return null;
      },
    },
  });

  const onSubmit = async (values: typeof form.values) => {
    try {
      setLoading(true);

      // Give delay for loading state
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!pokemon) {
        notifications.show({
          title: 'Error',
          message: 'Pokemon not found',
          color: 'red',
        });
        return;
      }

      const pokemonInLocalStorage = findPokemon(pokemon.id ?? 0);

      const result = await MyPokemonRepository.action.renamePokemon(pokemon.name, {
        newName: values.name,
        sequenceFibonnaci: pokemonInLocalStorage?.fibonnaciSequence ?? [],
      });


      // If only rename, then just rename the pokemon and close the modal
      // If not, then catch the pokemon and rename it
      if (!onlyRename) {
        catchPokemonAction({
          id: pokemon.id ?? 0,
          originalName: pokemon.name ?? '',
          nickname: values.name,
          fibonnaciSequence: [],
          totalRename: 0,
          types: pokemon.types,
          image_url: pokemon.image_url,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }

      renamePokemonAction(pokemon.id ?? 0, result.data.newName, result.data.currentFibonacci);

      notifications.show({
        title: 'Yeay 🎉',
        message: `Pokemon ${pokemon.name} has been caught!`,
        color: 'green',
      });

      onClose();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Rename Pokemon" centered>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap="md">
          <TextInput {...form.getInputProps('name')} label="Nickname" placeholder="Enter new nickname" />
          <Button loading={loading} type="submit" variant="filled" color="grape" fullWidth>
            Rename
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default ModalRenamePokemon;
