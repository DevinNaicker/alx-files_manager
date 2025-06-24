/* eslint-disable import/no-named-as-default */
import sha1 from 'sha1';
import dbClient from '../utils/db';

export default class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body || {};

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    const userExists = await dbClient.usersCollection.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'Already exist' });
    }

    const newUser = {
      email,
      password: sha1(password),
    };

    const result = await dbClient.usersCollection.insertOne(newUser);
    const userId = result.insertedId.toString();

    return res.status(201).json({ email, id: userId });
  }
}
