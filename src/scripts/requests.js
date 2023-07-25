import { toast } from "./toasts.js";

const baseUrl = 'http://localhost:3333';
export const colorSuccess = '#087d5a';
export const colorError = '#c83751';


export async function sendLogin(loginBody) {
  const options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginBody),
  }

  const token = await fetch(`${baseUrl}/login`, options)
    .then(async response => {
      const responseJson = await response.json();
      if (response.ok) {
        localStorage.setItem('@petInfo:token', responseJson.token);

        toast('Login Realizado com Sucesso! Redirecionando para Dashboard!', colorSuccess);

        setTimeout(() => {
          window.location.replace('./src/pages/dashboard.html');
        }, 4000);

      } else {
        throw new Error(responseJson.message);
      }
    })
    .catch(err => toast(err.message, colorError));

  return token;
}

export async function createUserRegister(registerBody) {
  const options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registerBody),
  }

  const request = await fetch(`${baseUrl}/users/create`, options)
    .then(async response => {
      const responseJson = await response.json();
      if (response.ok) {
        toast('Seu usuário foi criado com sucesso! Redirecionando para página de login!', colorSuccess);
        setTimeout(() => {
          window.location.href = '../../index.html'
        }, 2000);
      } else {
        throw new Error(responseJson.message);
      }
    })
    .catch(err => toast(err.message, colorError));
}

export async function readInfoUser() {
  const token = localStorage.getItem('@petInfo:token');
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const infoUser = await fetch(`${baseUrl}/users/profile`, options)
    .then(async (response) => {
      const responseJson = await response.json();

      if (response.ok) {
        return responseJson;
      } else {
        throw new Error(responseJson.message);
      }
    })
    .catch(err => toast(err.message, colorError));

  return infoUser;
}

export async function readAllPosts() {
  const token = localStorage.getItem('@petInfo:token');
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const posts = await fetch(`${baseUrl}/posts`, options)
    .then(async (response) => {
      const responseJson = await response.json();
      if (response.ok) {
        return responseJson;
      } else {
        throw new Error(responseJson.message);
      }
    })
    .catch(err => toast(err.message, colorError));
  return posts;
}

export async function updatePost(idPost, updateBody) {
  const token = localStorage.getItem('@petInfo:token');
  const options = {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(updateBody),
  }

  const update = await fetch(`${baseUrl}/posts/${idPost}`, options)
    .then(async (response) => {
      const responseJson = await response.json();
      if (response.ok) {
        toast('Post atualizado com sucesso!', colorSuccess);
        return responseJson;
      } else {
        throw new Error(responseJson.message);
      }
    })
    .catch(err => toast(err.message, colorError))

  return update;
}

export async function createPost(postBody) {
  const token = localStorage.getItem('@petInfo:token');
  const options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postBody),
  }

  const newPost = await fetch(`${baseUrl}/posts/create`, options)
    .then(async (response) => {
      const responseJson = await response.json();
      if (response.ok) {
        toast('Post criado com sucesso!', colorSuccess);
        return responseJson;
      } else {
        throw new Error(responseJson.message);
      }
    })
    .catch(err => toast(err.message, colorError));
  return newPost;
}

export async function deletePost(idPost){
  const token = localStorage.getItem('@petInfo:token');
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const postDelete = await fetch(`${baseUrl}/posts/${idPost}`, options)
  .then(async (response) => {
    const responseJson = response.json();
    if(response.ok){
      toast('Post Deletado com sucesso!', colorSuccess);
      return responseJson;
    } else {
      throw new Error(responseJson.message);
    }
  })
  .catch(err => toast(err.message, colorError));

  return postDelete;
}