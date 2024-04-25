import { AppShell, Burger, Button, Group, Skeleton, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import classes from './MainLayout.module.css';
import { useRouter } from 'next/router';

type onClickNavParams = 'home' | 'my-pokemon';

export const MainLayout = ({ children }: any) => {
  const [opened, { toggle }] = useDisclosure();
  const { push } = useRouter();

  const onClickNav = (type: onClickNavParams) => {
    toggle();

    if (type === 'home') {
      push('/');
    } else {
      push('/my-pokemon');
    }
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
    >
      <AppShell.Header>
        <Group h="100%" className="px-4 lg:px-12">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Image src="/logo.png" alt="Logo" width={50} height={50} />
            <Group ml="xl" gap={0} visibleFrom="sm">
              <UnstyledButton className={classes.control} onClick={() => onClickNav('home')}>
                Home
              </UnstyledButton>
              <UnstyledButton className={classes.control} onClick={() => onClickNav('my-pokemon')}>
                My Pokemon
              </UnstyledButton>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <UnstyledButton className={classes.control} onClick={() => onClickNav('home')}>
          Home
        </UnstyledButton>
        <UnstyledButton className={classes.control} onClick={() => onClickNav('my-pokemon')}>
          My Pokemon
        </UnstyledButton>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
