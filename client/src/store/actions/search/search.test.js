import { updateSearchInput } from "./search";
import * as ActionTypes from "../../actions/types";

test("update search input action creator returns input update action", () => {
    const action = updateSearchInput("react");
    expect(action).toEqual({ type: ActionTypes.INPUT_UPDATED, newSearch: "react" });
});