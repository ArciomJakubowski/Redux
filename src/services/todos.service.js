import httpService from "./http.service";

const todosEndpount = "todos/";

const todosService = {
  fetch: async () => {
    const { data } = await httpService.get(todosEndpount, {
      params: {
        _page: 1,
        _limit: 1,
      },
    });
    return data;
  },

  create: async () => {
    const { data } = await httpService.post(todosEndpount, {
      title: "new title",
      completed: false,
    });
    return data;
  },
};

export default todosService;
