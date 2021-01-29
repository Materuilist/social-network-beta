import { tokenId } from "../../constants";
import { AuthService } from "../../services/auth.service";

const authService = new AuthService();

export const getUser = (cb) => async (dispatch, getState) => {
    const token = localStorage.getItem(tokenId);
    if (!token) {
        return cb && typeof cb === "function" && cb();
    }

    const user = await authService.getUser();
    console.log(user)
};
