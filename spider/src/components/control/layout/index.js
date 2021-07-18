import Center from "./Center"
import Left from "./Left"
import Right from "./Right"

function install(vue) {
    vue.component("Center", Center);
    vue.component("Right", Right);
    vue.component("Left", Left);


}

export default install