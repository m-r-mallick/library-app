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

export async function getAllBookItems(username, password) {
   const res = await fetch(`http://localhost:9000/api/v1/copies/`, {
      method: "GET",
      headers: {
         username: username,
         password: password,
      },
   });
   const bookItemsData = await res.json();
   return bookItemsData;
}

export async function getAllUsers(username, password) {
   const res = await fetch(
      `http://localhost:9000/management/api/v1/accounts/`,
      {
         method: "GET",
         headers: {
            username,
            password,
         },
      }
   );
   const usersData = await res.json();
   return usersData;
}

export async function getAllRoles(username, password) {
   const res = await fetch(`http://localhost:9000/management/api/v1/roles/`, {
      method: "GET",
      headers: {
         username,
         password,
      },
   });
   const rolesData = await res.json();
   return rolesData;
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

export async function getRoleById(username, password, roleId) {
   const res = await fetch(
      `http://localhost:9000/management/api/v1/roles/${roleId}`,
      {
         method: "GET",
         headers: {
            username,
            password,
         },
      }
   );
   const roleData = await res.json();
   return roleData;
}

export function formatDate(date) {
   const dd = String(date.getDate()).padStart(2, "0");
   const mm = String(date.getMonth() + 1).padStart(2, "0");
   const yyyy = date.getFullYear();

   const formattedDate = yyyy + "-" + mm + "-" + dd;
   return formattedDate;
}
