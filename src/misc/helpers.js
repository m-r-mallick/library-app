export async function refreshUserProfile({ username, password }) {
   const res = await fetch(
      "http://localhost:9000/management/api/v1/accounts/",
      {
         method: "GET",
         headers: {
            username: username,
            password: password,
         },
      }
   );
   const data = await res.json();
   return data;
}

export async function getRoles(username, password, uid) {
   const res = await fetch(
      `http://localhost:9000/management/api/v1/accounts/getRoles/${uid}`,
      {
         method: "GET",
         headers: {
            username: username,
            password: password,
         },
      }
   );
   const rolesData = await res.json();
   return rolesData;
}

export async function getAllBooks(username, password) {
   const res = await fetch(`http://localhost:9000/api/v1/books/`, {
      method: "GET",
      headers: {
         username: username,
         password: password,
      },
   });
   const booksData = await res.json();
   return booksData;
}

export async function getAllAuthors(username, password) {
   const res = await fetch(`http://localhost:9000/api/v1/authors/`, {
      method: "GET",
      headers: {
         username: username,
         password: password,
      },
   });
   const authorsData = await res.json();
   return authorsData;
}

export async function getAuthorById(id, username, password) {
   const res = await fetch(`http://localhost:9000/api/v1/authors/${id}`, {
      method: "GET",
      headers: {
         username: username,
         password: password,
      },
   });
   const authorData = await res.json();
   return authorData;
}
