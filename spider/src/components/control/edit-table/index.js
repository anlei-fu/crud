import CasscaderForm from "./CasscaderForm"
import CheckboxForm from "./CheckboxForm"
import EditTable from "./EditTable"
import EnumItemForm from "./EnumItemForm"
import IndexForm from "./IndexForm"
import JoinForm from "./JoinForm"
import OrderByForm from "./OrderByForm"
import TableColumnForm from "./TableColumnForm"
import TableEnumForm from "./TableEnumForm"
import AddControlAutoAnalyzeForm from "./AddControlAutoAnalyzeForm"
import QueryControlAutoAnalyzeForm from "./QueryControlAutoAnalyzeForm"
import JavaTypeAutoAnalyzeForm from "./JavaTypeAutoAnalyzeForm"
import RuleAutoAnalyzeForm from "./RuleAutoAnalyzeForm"
import SqlDefaultValueForm from "./SqlDefaultValueForm"
import JavaTypeForm from "./JavaTypeForm"
import ValidateRuleForm from "./ValidateRuleForm"
import ControlForm from "./ControlForm"
import DisplayColumnForm from "./DisplayColumnForm"
import FilterColumnForm from "./FilterColumnForm"
import AddColumnForm from "./AddColumnForm"

function install(vue) {
    vue.component("CasscaderForm", CasscaderForm);
    vue.component("CheckboxForm", CheckboxForm);
    vue.component("EditTable", EditTable);
    vue.component("EnumItemForm", EnumItemForm);
    vue.component("IndexForm", IndexForm);
    vue.component("JoinForm", JoinForm);
    vue.component("OrderByForm", OrderByForm);
    vue.component("TableColumnForm", TableColumnForm);
    vue.component("TableEnumForm", TableEnumForm);
    vue.component("AddControlAutoAnalyzeForm", AddControlAutoAnalyzeForm);
    vue.component("QueryControlAutoAnalyzeForm", QueryControlAutoAnalyzeForm);
    vue.component("JavaTypeAutoAnalyzeForm", JavaTypeAutoAnalyzeForm);
    vue.component("RuleAutoAnalyzeForm", RuleAutoAnalyzeForm);
    vue.component("SqlDefaultValueForm", SqlDefaultValueForm);
    vue.component("JavaTypeForm", JavaTypeForm);
    vue.component("ValidateRuleForm", ValidateRuleForm);
    vue.component("ControlForm", ControlForm);
    vue.component("DisplayColumnForm", DisplayColumnForm);
    vue.component("FilterColumnForm", FilterColumnForm);
    vue.component("AddColumnForm", AddColumnForm);

}

export default install
