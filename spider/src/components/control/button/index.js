import BatchDeleteButton from"./BatchDeleteButton"
import BatchEditButton from"./BatchEditButton"
import CopyButton from"./CopyButton"
import CreateButton from"./CreateButton"
import DeleteButton from"./DeleteButton"
import EditButton from"./EditButton"
import ExportExcelButton from"./ExportExcelButton"
import ImportExcelButton from"./ImportExcelButton"
import QueryButton from"./QueryButton"

function install(vue){
    vue.component( "BatchDeleteButton",BatchDeleteButton);
    vue.component( "BatchEditButton",BatchEditButton);
    vue.component( "CopyButton",CopyButton);
    vue.component( "CreateButton",CreateButton);
    vue.component( "DeleteButton",DeleteButton);
    vue.component( "EditButton",EditButton);
    vue.component( "ExportExcelButton",ExportExcelButton);
    vue.component( "ImportExcelButton",ImportExcelButton);
    vue.component( "QueryButton",QueryButton);
}

export default install