import AnalyzeConfig from "./AnalyzeConfig"
import BackendConfig from "./BackendConfig"
import FrontendConfig from "./FrontendConfig"
import GenerateConfigForm from "./GenerateConfigForm"
import GlobalConfig from "./GlobalConfig"
import DefaultValueConfig from "./DefaultValueConfig"

function install(vue) {
    vue.component( "AnalyzeConfig",AnalyzeConfig);
    vue.component( "BackendConfig",BackendConfig);
    vue.component( "FrontendConfig",FrontendConfig);
    vue.component( "GenerateConfigForm",GenerateConfigForm);
    vue.component( "GlobalConfig",GlobalConfig);
    vue.component( "DefaultValueConfig",DefaultValueConfig);

}

export default install