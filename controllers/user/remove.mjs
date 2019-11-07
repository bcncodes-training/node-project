import userDAO from '../../models/user/dao.mjs';
import HTTPError from 'http-errors';

export const removeUser = async (request, response, next) => {
	try {
		const user = await userDAO.listOne (request.params.id);
		if (user) {
			await userDAO.remove (request.params.id);
			response.status (200).json ({message: `User successfully deleted: ${user.name}`});
		} else {
			response.status (404).json ({message: "User identifier does not exist"});
		}
	} catch (error) {
		return next (error);
	}
};
