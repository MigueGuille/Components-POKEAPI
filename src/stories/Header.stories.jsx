import Header from "./Header";
import CustomInput from "../customInput/CustomInput";
import CustomInputStories from "../customInput/CustomInput.stories";

export default{
  component: Header,
}

export const header = {
  args: {
    children: CustomInput({ placeholder:"Search" })
  }
}