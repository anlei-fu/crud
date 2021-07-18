import ExportSqlForm from "./ExportSqlForm"
import ImportDataForm from "./ImportDataForm"
import ProjectConfig from "./ProjectConfig"
import TableCodeViewer from "./TableCodeViewer"
import TableConfig from "./TableConfig"
import TableForm from "./TableForm"

function install(vue) {
    vue.component("ExportSqlForm", ExportSqlForm);
    vue.component("ImportDataForm", ImportDataForm);
    vue.component("ProjectConfig", ProjectConfig);
    vue.component("TableCodeViewer", TableCodeViewer);
    vue.component("TableConfig", TableConfig);
    vue.component("TableForm", TableForm);

}

export default install
