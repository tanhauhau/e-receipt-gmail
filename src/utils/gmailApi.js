/**
 * Retrieve Messages in user's mailbox matching query.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} query String used to filter the Messages listed.
 */
export const listMessages = function listMessages(userId, query) {
  return new Promise(function(resolve, reject) {
    const getPageOfMessages = function(request, result) {
      request.execute(function(resp) {
        result = result.concat(resp.messages);
        const nextPageToken = resp.nextPageToken;
        if (nextPageToken) {
          request = gapi.client.gmail.users.messages.list({
            'userId': userId,
            'pageToken': nextPageToken,
            'q': query,
            includeSpamTrash: true
          });
          getPageOfMessages(request, result);
        } else {
          resolve(result);
        }
      });
    };
    const initialRequest = gapi.client.gmail.users.messages.list({
      'userId': userId,
      'q': query,
      includeSpamTrash: true
    });
    getPageOfMessages(initialRequest, []);
  });
};

/**
 * Get Message with given ID.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} messageId ID of Message to get.
 */
export const getMessage = function getMessage(userId, messageId) {
  return new Promise(function(resolve, reject) {
    gapi.client.gmail.users.messages.get({
     'userId': userId,
     'id': messageId
   }).execute(resolve);
  });
}

export const getCurrentUserId = function () {
  const authInstance = gapi.auth2.getAuthInstance();
  if (authInstance.isSignedIn.get()) {
    return authInstance.currentUser.get().getId();
  }
  return null;
}
