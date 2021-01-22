const User = require("./user");

class UsersController {
  constructor(usersService) {
    this.usersService = usersService;
  }

  async createUser(req, res, next) {
    try {
      const user = await this.usersService.createUser(
        req["body"]["name"],
        req["body"]["address"]
      );
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async listUsers(req, res, next) {
    try {
      res.json(await this.usersService.listUsers());
    } catch (error) {
      next(error);
    }
  }

  async getUser(req, res, next) {
    try {
      const id = req["params"]["id"];
      res.json(await this.usersService.getUser(id));
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const id = req.params.id;
      const name = req.body.name;
      let user = new User(id, name);
      user = await this.usersService.updateUser(user);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const id = req["params"]["id"];
      console.log("Id:", id);
      await this.usersService.deleteUser(id);
      res.statusCode = 204;
      res.json();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UsersController;
