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

    const user = await (await dbClient.usersCollection()).findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'Already exist' });
    }

    const hashedPassword = sha1(password);
    const insertionInfo = await (await dbClient.usersCollection()).insertOne({
      email,
      password: hashedPassword,
    });

    const userId = insertionInfo.insertedId.toString();
    return res.status(201).json({ email, id: userId });
  }
}
