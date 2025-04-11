export async function getRandomUsers(count = 50) {
  try {
    console.log('fetch random users...')
    const response = await fetch(`https://randomuser.me/api/?results=${count}`);
    const users = await response.json();

    console.log('Successfully get', users.length);
    return users;
  } catch (err) {
    console.error('[ERROR] getRandomUser:', err.message, 'users')
  }
}
getRandomUsers()