export const api = {
  gifts: () =>
    new Promise((resolve, reject) => {
      try {
        const listStorage = localStorage.getItem("lista");
        setTimeout(
          () =>
            resolve({
              status: "200 ok",
              data: listStorage ? JSON.parse(listStorage) : [],
            }),
          1000
        );
      } catch (error) {
        reject({
          status: "400 error",
          data: [],
        });
      }
    }),
  save: (data) =>
    new Promise((resolve, reject) => {
      try {
        localStorage.setItem("lista", JSON.stringify(data));
        resolve("200, exito");
      } catch (error) {
        reject(`404 ${error}`);
      }
    }),
};
