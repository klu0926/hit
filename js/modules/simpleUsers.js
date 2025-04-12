// Take out all the data that is not used generated from random user generater
// this is ONLY for user generate by random user generator
export function simplifyUsers(users) {
  return users.map(user => ({
    title: user.name.title,
    firstName: user.name.first,
    lastName: user.name.last,
    uuid: user.login.uuid,
    gender: user.gender,
    address: `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}`,
    picture: user.picture.large,
    avatar: ''
  }));
}