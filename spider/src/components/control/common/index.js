import ColumnSelector from "./ColumnSelector"
import ContextMenuWrapper from "./ContextMenuWrapper"
import DetailView from "./DetailView"
import Drag from "./Drag"
import DropdownMenu from "./DropdownMenu"
import FileReader from "./FileReader"
import Footer from "./Footer"
import formFilter from "./formFilter"
import Groupbox from "./Groupbox"
import Help from "./Help"
import ImageUploader from "./ImageUploader"
import ImageViewer from "./ImageViewer"
import LeftNavMenu from "./LeftNavMenu"
import Link from "./Link"
import Loading from "./Loading"
import MutipleSelect from "./MutipleSelect"
import MyCard from "./MyCard"
import MyCheckbox from "./MyCheckbox"
import MyCheckBoxGroup from "./MyCheckBoxGroup"
import MyCollapse from "./MyCollapse"
import MyColorPicker from "./MyColorPicker"
import MyContextMenu from "./MyContextMenu"
import MyDateRange from "./MyDateRange"
import MyDateTime from "./MyDateTime"
import MyFileUploader from "./MyFileUploader"
import MyFilter from "./MyFilter"
import MyForm from "./MyForm"
import MyInput from "./MyInput"
import MyInputBox from "./MyInputBox"
import MyModal from "./MyModal"
import MyNegativeProgress from "./MyNegativeProgress"
import MyPager from "./MyPager"
import MyPageSettingButton from "./MyPageSettingButton"
import MyPositiveProgress from "./MyPositiveProgress"
import MyRadioGroup from "./MyRadioGroup"
import MyScroll from "./MyScroll"
import MySelect from "./MySelect"
import MyTable from "./MyTable"
import MyTag from "./MyTag"
import NavMenu from "./NavMenu"
import NavTab from "./NavTab"
import OperationPanel from "./OperationPanel"
import PageSettIng from "./PageSettIng"
import PlainText from "./PlainText"
import SearchBox from "./SearchBox"
import Window from "./Window"
import TabItem from "./TabItem"


function install(vue) {
    vue.component( "ColumnSelector",ColumnSelector);
    vue.component( "ContextMenuWrapper",ContextMenuWrapper);
    vue.component( "DetailView",DetailView);
    vue.component( "Drag",Drag);
    // vue.component( "DropdownMenu",DropdownMenu);
    vue.component( "FileReader",FileReader);
    vue.component( "Footer",Footer);
    vue.component( "formFilter",formFilter);
    vue.component( "Groupbox",Groupbox);
    vue.component( "Help",Help);
    vue.component( "ImageUploader",ImageUploader);
    vue.component( "ImageViewer",ImageViewer);
    vue.component( "LeftNavMenu",LeftNavMenu);
    vue.component( "Link",Link);
    vue.component( "Loading",Loading);
    vue.component( "MutipleSelect",MutipleSelect);
    vue.component( "MyCard",MyCard);
    vue.component( "MyCheckbox",MyCheckbox);
    vue.component( "MyCheckBoxGroup",MyCheckBoxGroup);
    vue.component( "MyCollapse",MyCollapse);
    vue.component( "MyColorPicker",MyColorPicker);
    vue.component( "MyContextMenu",MyContextMenu);
    vue.component( "MyDateRange",MyDateRange);
    vue.component( "MyDateTime",MyDateTime);
    vue.component( "MyFileUploader",MyFileUploader);
    vue.component( "MyFilter",MyFilter);
    vue.component( "MyForm",MyForm);
    vue.component( "MyInput",MyInput);
    vue.component( "MyInputBox",MyInputBox);
    vue.component( "MyModal",MyModal);
    vue.component( "MyNegativeProgress",MyNegativeProgress);
    vue.component( "MyPager",MyPager);
    vue.component( "MyPageSettingButton",MyPageSettingButton);
    vue.component( "MyPositiveProgress",MyPositiveProgress);
    vue.component( "MyRadioGroup",MyRadioGroup);
    vue.component( "MyScroll",MyScroll);
    vue.component( "MySelect",MySelect);
    vue.component( "MyTable",MyTable);
    vue.component( "MyTag",MyTag);
    vue.component( "NavMenu",NavMenu);
    vue.component( "NavTab",NavTab);
    vue.component( "OperationPanel",OperationPanel);
    vue.component( "PageSettIng",PageSettIng);
    vue.component( "PlainText",PlainText);
    vue.component( "SearchBox",SearchBox);
    vue.component( "TabItem",TabItem);
    vue.component( "Window",Window);
    
}

export default install