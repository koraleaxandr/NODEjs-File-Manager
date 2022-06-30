export const messages = {
    pageNotFoundMessage: 'Page not found!',
    userNotFoundMessage: 'User with such ID not found!',
    notValidIdMessage: 'Not valid user ID',
    userDeletedMessage: (id: string): string => {return`User ${id} succesfully deleted!`},
    requestWriteMessage: 'Request ok',
}