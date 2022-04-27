import Enum, { EnumType } from "./classes/Enum";
import Button, { ButtonProps } from "./components/Common/Button";
import ButtonLink, { ButtonLinkProps } from "./components/Common/ButtonLink";
import ButtonDownload, { ButtonDownloadProps } from "./components/Common/ButtonDownload";
import ButtonEndpoint, { ButtonEndpointProps } from "./components/Common/ButtonEndpoint";
import ButtonEndpointDialogConfirm, {
    ButtonEndpointDialogConfirmProps,
} from "./components/Common/ButtonEndpointDialogConfirm";
import DialogConfirm, { DialogConfirmProps } from "./components/Common/DialogConfirm";
import ButtonDialogForm, { ButtonDialogFormProps } from "./components/Common/ButtonDialogForm";
import IconButton, { IconButtonProps } from "./components/Common/IconButton";
import IconButtonLink, { IconButtonLinkProps } from "./components/Common/IconButtonLink";
import IconButtonDownload, { IconButtonDownloadProps } from "./components/Common/IconButtonDownload";
import IconButtonEndpoint, { IconButtonEndpointProps } from "./components/Common/IconButtonEndpoint";
import IconButtonEndpointDialogConfirm, {
    IconButtonEndpointDialogConfirmProps,
} from "./components/Common/IconButtonEndpointDialogConfirm";
// TODO
// import IconButtonDialogForm, { IconButtonDialogFormProps } from "./components/Common/IconButtonDialogForm";
import {
    FormContext,
    FormContextProps,
    FormProvider,
    FormProviderProps,
    useForm,
} from "./components/Form/contexts/Form";
import { ErrorContext, ErrorContextProps, ErrorProvider, ErrorProviderProps, useError } from "./contexts/Error";
import {
    HandleCatchContext,
    HandleCatchContextProps,
    HandleCatchProvider,
    HandleCatchProviderProps,
    useHandleCatch,
    AXIOS_CANCELLED_UNMOUNTED,
} from "./contexts/HandleCatch";
import {
    SnackbarContext,
    SnackbarContextProps,
    SnackbarProvider,
    SnackbarProviderProps,
    useSnackbar,
    SnackbarVariant,
} from "./contexts/Snackbar";
import { LoaderContext, LoaderContextProps, LoaderProvider, LoaderProviderProps, useLoader } from "./contexts/Loader";
import TranslateVariablesInterface from "./definitions/TranslateVariablesInterface";
import Table, { TableProps } from "./components/Table/components/Table";
import TableToolbar from "./components/Table/components/TableToolbar";
import TableContent from "./components/Table/components/TableContent";
import TableFilters from "./components/Table/components/TableFilters";
import TableFiltersFieldset, { TableFiltersFieldsetProps } from "./components/Table/components/TableFiltersFieldset";
import TableResults from "./components/Table/components/TableResults";
import TableResultsPagination from "./components/Table/components/TableResultsPagination";
import TableResultsPaginationActions from "./components/Table/components/TableResultsPaginationActions";
import { getColumns } from "./utilities/common";
import TextColumn, { TextColumnProps } from "./components/Table/columns/TextColumn";
import TextTruncateColumn, { TextTruncateColumnProps } from "./components/Table/columns/TextTruncateColumn";
import BooleanColumn, { BooleanColumnProps } from "./components/Table/columns/BooleanColumn";
import EnumColumn, { EnumColumnProps } from "./components/Table/columns/EnumColumn";
import RepresentationColumn, { RepresentationColumnProps } from "./components/Table/columns/RepresentationColumn";
import DateColumn, { DateColumnProps } from "./components/Table/columns/DateColumn";
import DateTimeColumn, { DateTimeColumnProps } from "./components/Table/columns/DateTimeColumn";
import TimeColumn, { TimeColumnProps } from "./components/Table/columns/TimeColumn";
import ActionsColumn, { ActionsColumnProps } from "./components/Table/columns/ActionsColumn";
import ResultButton, { ResultButtonProps } from "./components/Table/actions/ResultButton";
import ResultButtonLink, { ResultButtonLinkProps } from "./components/Table/actions/ResultButtonLink";
import ResultButtonDownload, { ResultButtonDownloadProps } from "./components/Table/actions/ResultButtonDownload";
import ResultButtonEndpoint, { ResultButtonEndpointProps } from "./components/Table/actions/ResultButtonEndpoint";
import ResultButtonEndpointDialogConfirm, {
    ResultButtonEndpointDialogConfirmProps,
} from "./components/Table/actions/ResultButtonEndpointDialogConfirm";
import Edit, { EditProps } from "./components/Table/actions/Edit";
// TODO
// import Delete, { DeleteProps } from "./components/Table/actions/Delete";
import Create, { CreateProps } from "./components/Table/toolbar/Create";
import ExportCsv, { ExportCsvProps } from "./components/Table/toolbar/ExportCsv";
import ExportExcel, { ExportExcelProps } from "./components/Table/toolbar/ExportExcel";
import Batch, { BatchProps } from "./components/Table/toolbar/Batch";
import BatchDelete, { BatchDeleteProps } from "./components/Table/toolbar/BatchDelete";
// TODO
// import BatchForm, { BatchFormProps } from "./components/Table/toolbar/BatchForm";
import BatchQueryInterface from "./components/Table/definitions/BatchQueryInterface";
import BatchSelectedType from "./components/Table/definitions/BatchSelectedType";
import DenyBehaviorType from "./components/Table/definitions/DenyBehaviorType";
import DenyPropInterface from "./components/Table/definitions/DenyPropInterface";
import DenyInterface from "./components/Table/definitions/DenyInterface";
import FiltersInterface from "./components/Table/definitions/FiltersInterface";
import FilterType from "./components/Table/definitions/FilterType";
import FilterValuesInterface from "./components/Table/definitions/FilterValuesInterface";
import ResultInterface from "./components/Table/definitions/ResultInterface";
import ColumnsInterface from "./components/Table/definitions/ColumnsInterface";
import QueryInterface from "./components/Table/definitions/QueryInterface";
import QuerySortingDefinitionInterface from "./components/Table/definitions/QuerySortingDefinitionInterface";
import QuerySortingInterface from "./components/Table/definitions/QuerySortingInterface";
import SortingDirection from "./components/Table/definitions/SortingDirection";
import SortingInterface from "./components/Table/definitions/SortingInterface";
import ExportQueryInterface from "./components/Table/definitions/ExportQueryInterface";
import TableColumnDisableSortingInterface from "./components/Table/definitions/TableColumnDisableSortingInterface";
import TableColumnPathType from "./components/Table/definitions/TableColumnPathType";
import TableColumnType from "./components/Table/definitions/TableColumnType";
import TableColumnsType from "./components/Table/definitions/TableColumnsType";
import TableQueriesInterface from "./components/Table/definitions/TableQueriesInterface";
import TableQueryInterface from "./components/Table/definitions/TableQueryInterface";
import TableResultActionInterface from "./components/Table/definitions/TableResultActionInterface";
import TableResultActionPathInterface from "./components/Table/definitions/TableResultActionPathInterface";
import TableResultActionResolveType from "./components/Table/definitions/TableResultActionResolveType";
import FilterFieldInterface from "./components/Table/definitions/FilterFieldInterface";
import FilterDefinition from "./components/Table/definitions/FilterDefinition";
import {
    TableContext,
    TableContextProps,
    TableProvider,
    TableProviderProps,
    useTable,
} from "./components/Table/contexts/Table";
import {
    TableQueryContext,
    TableQueryContextProps,
    TableQueryProvider,
    TableQueryProviderProps,
    useTableQuery,
} from "./components/Table/contexts/TableQuery";
import TextFilter, { TextFilterProps } from "./components/Table/filters/TextFilter";
import NumberFilter, { NumberFilterProps } from "./components/Table/filters/NumberFilter";
import NumberFromFilter, { NumberFromFilterProps } from "./components/Table/filters/NumberFromFilter";
import NumberToFilter, { NumberToFilterProps } from "./components/Table/filters/NumberToFilter";
import RadioFilter, { RadioFilterProps } from "./components/Table/filters/RadioFilter";
import RadioEnumFilter, { RadioEnumFilterProps } from "./components/Table/filters/RadioEnumFilter";
import RadioApiFilter, { RadioApiFilterProps } from "./components/Table/filters/RadioApiFilter";
import BooleanFilter, { BooleanFilterProps } from "./components/Table/filters/BooleanFilter";
import SelectFilter, { SelectFilterProps } from "./components/Table/filters/SelectFilter";
import SelectEnumFilter, { SelectEnumFilterProps } from "./components/Table/filters/SelectEnumFilter";
import SelectApiFilter, { SelectApiFilterProps } from "./components/Table/filters/SelectApiFilter";
import DateFromFilter, { DateFromFilterProps } from "./components/Table/filters/DateFromFilter";
import DateToFilter, { DateToFilterProps } from "./components/Table/filters/DateToFilter";
import DateTimeFromFilter, { DateTimeFromFilterProps } from "./components/Table/filters/DateTimeFromFilter";
import DateTimeToFilter, { DateTimeToFilterProps } from "./components/Table/filters/DateTimeToFilter";
import TimeFromFilter, { TimeFromFilterProps } from "./components/Table/filters/TimeFromFilter";
import TimeToFilter, { TimeToFilterProps } from "./components/Table/filters/TimeToFilter";
import FieldInterface from "./components/Form/definitions/FieldInterface";
import FieldLabelType from "./components/Form/definitions/FieldLabelType";
import FieldPlaceholderType from "./components/Form/definitions/FieldPlaceholderType";
import FieldsInterface from "./components/Form/definitions/FieldsInterface";
import Form, { FormProps } from "./components/Form/components/Form";
import FormContent, { FormContentProps } from "./components/Form/components/FormContent";
import { getFields } from "./utilities/common";
import OptionsType from "./components/Form/definitions/OptionsType";
import OptionInterface from "./components/Form/definitions/OptionInterface";
import Radio, { RadioProps } from "./components/Form/fields/Radio";
import RadioEnum, { RadioEnumProps } from "./components/Form/fields/RadioEnum";
import RadioApi, { RadioApiProps } from "./components/Form/fields/RadioApi";
import TrueFalse, { TrueFalseProps } from "./components/Form/fields/TrueFalse";
import Select, { SelectProps } from "./components/Form/fields/Select";
import SelectEnum, { SelectEnumProps } from "./components/Form/fields/SelectEnum";
import SelectApi, { SelectApiProps } from "./components/Form/fields/SelectApi";
import Multiselect, { MultiselectProps } from "./components/Form/fields/Multiselect";
import MultiselectApi, { MultiselectApiProps } from "./components/Form/fields/MultiselectApi";
import { SelectValueType } from "./components/Form/definitions/AutocompleteTypes";
import FieldHelpType from "./components/Form/definitions/FieldHelpType";
import Textarea, { TextareaProps } from "./components/Form/fields/Textarea";
import Text, { TextProps } from "./components/Form/fields/Text";
import Email, { EmailProps } from "./components/Form/fields/Email";
import Password, { PasswordProps } from "./components/Form/fields/Password";
import DatePicker, { DatePickerProps } from "./components/Form/fields/DatePicker";
import DateTimePicker, { DateTimePickerProps } from "./components/Form/fields/DateTimePicker";
import TimePicker, { TimePickerProps } from "./components/Form/fields/TimePicker";
import Checkbox, { CheckboxProps } from "./components/Form/fields/Checkbox";
import Collection, { CollectionProps } from "./components/Form/fields/Collection";
import {
    resolveAnyOrFunction,
    resolveBooleanOrFunction,
    resolveStringOrFunction,
    resolveReactNodeOrFunction,
    resolveAxiosRequestConfigOrFunction,
    resolveEndpoint,
    resolveFieldEndpoint,
} from "./utilities/resolve";
import { renderField, filterInitialValues, transformInitialValues } from "./utilities/common";
import { Optional } from "./utilities/TypescriptOperators";
export {
    Enum,
    EnumType,
    Button,
    ButtonProps,
    ButtonLink,
    ButtonLinkProps,
    ButtonDownload,
    ButtonDownloadProps,
    ButtonEndpoint,
    ButtonEndpointProps,
    ButtonEndpointDialogConfirm,
    ButtonEndpointDialogConfirmProps,
    DialogConfirm,
    DialogConfirmProps,
    ButtonDialogForm,
    ButtonDialogFormProps,
    IconButton,
    IconButtonProps,
    IconButtonLink,
    IconButtonLinkProps,
    IconButtonDownload,
    IconButtonDownloadProps,
    IconButtonEndpoint,
    IconButtonEndpointProps,
    IconButtonEndpointDialogConfirm,
    IconButtonEndpointDialogConfirmProps,
    // TODO
    // IconButtonDialogForm,
    // IconButtonDialogFormProps,
    TranslateVariablesInterface,
    Table,
    TableProps,
    TableToolbar,
    TableContent,
    TableFilters,
    TableFiltersFieldset,
    TableFiltersFieldsetProps,
    TableResults,
    TableResultsPagination,
    TableResultsPaginationActions,
    getColumns,
    BatchQueryInterface,
    BatchSelectedType,
    DenyBehaviorType,
    DenyPropInterface,
    DenyInterface,
    FiltersInterface,
    FilterType,
    FilterValuesInterface,
    ResultInterface,
    QueryInterface,
    QuerySortingDefinitionInterface,
    QuerySortingInterface,
    SortingDirection,
    SortingInterface,
    TextColumn,
    TextColumnProps,
    TextTruncateColumn,
    TextTruncateColumnProps,
    BooleanColumn,
    BooleanColumnProps,
    EnumColumn,
    EnumColumnProps,
    RepresentationColumn,
    RepresentationColumnProps,
    DateColumn,
    DateColumnProps,
    DateTimeColumn,
    DateTimeColumnProps,
    TimeColumn,
    TimeColumnProps,
    ActionsColumn,
    ActionsColumnProps,
    ResultButton,
    ResultButtonProps,
    ResultButtonLink,
    ResultButtonLinkProps,
    ResultButtonDownload,
    ResultButtonDownloadProps,
    ResultButtonEndpoint,
    ResultButtonEndpointProps,
    ResultButtonEndpointDialogConfirm,
    ResultButtonEndpointDialogConfirmProps,
    Edit,
    EditProps,
    // Delete,
    // DeleteProps,
    Create,
    CreateProps,
    ExportCsv,
    ExportCsvProps,
    ExportExcel,
    ExportExcelProps,
    Batch,
    BatchProps,
    BatchDelete,
    BatchDeleteProps,
    // TODO
    // BatchForm,
    // BatchFormProps,
    ColumnsInterface,
    ExportQueryInterface,
    TableContext,
    TableContextProps,
    TableProvider,
    TableProviderProps,
    useTable,
    TableColumnDisableSortingInterface,
    TableColumnPathType,
    TableColumnType,
    TableColumnsType,
    TableQueriesInterface,
    TableQueryInterface,
    TableResultActionInterface,
    TableResultActionPathInterface,
    TableResultActionResolveType,
    FilterDefinition,
    FilterFieldInterface,
    TableQueryContext,
    TableQueryContextProps,
    TableQueryProvider,
    TableQueryProviderProps,
    useTableQuery,
    TextFilter,
    TextFilterProps,
    NumberFilter,
    NumberFilterProps,
    NumberFromFilter,
    NumberFromFilterProps,
    NumberToFilter,
    NumberToFilterProps,
    RadioFilter,
    RadioFilterProps,
    RadioEnumFilter,
    RadioEnumFilterProps,
    RadioApiFilter,
    RadioApiFilterProps,
    BooleanFilter,
    BooleanFilterProps,
    SelectFilter,
    SelectFilterProps,
    SelectEnumFilter,
    SelectEnumFilterProps,
    SelectApiFilter,
    SelectApiFilterProps,
    DateFromFilter,
    DateFromFilterProps,
    DateToFilter,
    DateToFilterProps,
    DateTimeFromFilter,
    DateTimeFromFilterProps,
    DateTimeToFilter,
    DateTimeToFilterProps,
    TimeFromFilter,
    TimeFromFilterProps,
    TimeToFilter,
    TimeToFilterProps,
    FormContext,
    FormContextProps,
    FormProvider,
    FormProviderProps,
    useForm,
    ErrorContext,
    ErrorContextProps,
    ErrorProvider,
    ErrorProviderProps,
    useError,
    HandleCatchContext,
    HandleCatchContextProps,
    HandleCatchProvider,
    HandleCatchProviderProps,
    useHandleCatch,
    AXIOS_CANCELLED_UNMOUNTED,
    SnackbarContext,
    SnackbarContextProps,
    SnackbarProvider,
    SnackbarProviderProps,
    useSnackbar,
    SnackbarVariant,
    LoaderContext,
    LoaderContextProps,
    LoaderProvider,
    LoaderProviderProps,
    useLoader,
    FieldInterface,
    FieldLabelType,
    FieldPlaceholderType,
    FieldsInterface,
    Form,
    FormProps,
    FormContent,
    FormContentProps,
    getFields,
    OptionsType,
    OptionInterface,
    FieldHelpType,
    Radio,
    RadioProps,
    RadioEnum,
    RadioEnumProps,
    RadioApi,
    RadioApiProps,
    TrueFalse,
    TrueFalseProps,
    Select,
    SelectProps,
    SelectEnum,
    SelectEnumProps,
    SelectApi,
    SelectApiProps,
    Multiselect,
    MultiselectProps,
    MultiselectApi,
    MultiselectApiProps,
    SelectValueType,
    Textarea,
    TextareaProps,
    Text,
    TextProps,
    Email,
    EmailProps,
    Password,
    PasswordProps,
    DatePicker,
    DatePickerProps,
    DateTimePicker,
    DateTimePickerProps,
    TimePicker,
    TimePickerProps,
    Checkbox,
    CheckboxProps,
    Collection,
    CollectionProps,
    resolveAnyOrFunction,
    resolveBooleanOrFunction,
    resolveStringOrFunction,
    resolveReactNodeOrFunction,
    resolveAxiosRequestConfigOrFunction,
    resolveEndpoint,
    resolveFieldEndpoint,
    renderField,
    filterInitialValues,
    transformInitialValues,
    Optional,
};
