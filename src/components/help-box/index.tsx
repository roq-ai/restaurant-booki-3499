import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Owner'];
  const roles = ['Customer', 'Owner', 'Chef', 'Waiter'];
  const applicationName = `Restaurant booking engine`;
  const tenantName = `Restaurant`;
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `1. As a Restaurant Owner, I want to create a restaurant profile with basic information (name, address, phone number, email) so that customers can find my restaurant in the app.

2. As a Restaurant Owner, I want to invite Chefs and Waiters to join the app so that they can manage table reservations and menus.

3. As a Restaurant Owner, I want to set up the restaurant's table layout and capacity so that customers can reserve tables accordingly.

4. As a Restaurant Owner, I want to create and manage menus (add, edit, delete menu items) so that customers can view and choose from the available options.

5. As a Chef, I want to view and update the status of menu items (available, unavailable) so that customers can see the current availability of dishes.

6. As a Waiter, I want to view and manage table reservations (accept, decline, modify) so that I can efficiently allocate tables to customers.

7. As a Waiter, I want to assign tables to customers upon arrival so that they can be seated according to their reservation.

8. As a Customer, I want to search for restaurants based on location, cuisine, and availability so that I can find a suitable restaurant to reserve a table.

9. As a Customer, I want to view restaurant profiles, including menus and table availability, so that I can make an informed decision before reserving a table.

10. As a Customer, I want to reserve a table at a restaurant, specifying the date, time, and number of guests, so that I can secure a spot for my dining experience.

11. As a Customer, I want to view and manage my table reservations (modify, cancel) so that I can make changes to my plans if needed.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="30px" bottom="20px" zIndex={3}>
      <Popover placement="top-end">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent w="50vw" h="70vh">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
