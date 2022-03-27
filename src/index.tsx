import Button, { ButtonProps } from "./components/Common/Button";
import ButtonLink, { ButtonLinkProps } from "./components/Common/ButtonLink";
import ButtonDownload, { ButtonDownloadProps } from "./components/Common/ButtonDownload";
import ButtonEndpoint, { ButtonEndpointProps } from "./components/Common/ButtonEndpoint";
import ButtonEndpointConfirmation, {
    ButtonEndpointConfirmationProps,
} from "./components/Common/ButtonEndpointConfirmation";
// TODO
// import ButtonDialogForm, { ButtonDialogFormProps } from "./components/Common/ButtonDialogForm";
import IconButton, { IconButtonProps } from "./components/Common/IconButton";
import IconButtonLink, { IconButtonLinkProps } from "./components/Common/IconButtonLink";
import IconButtonDownload, { IconButtonDownloadProps } from "./components/Common/IconButtonDownload";
import IconButtonEndpoint, { IconButtonEndpointProps } from "./components/Common/IconButtonEndpoint";
import IconButtonEndpointConfirmation, {
    IconButtonEndpointConfirmationProps,
} from "./components/Common/IconButtonEndpointConfirmation";
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
import AppDateFnsUtils from "./utils/AppDateFnsUtils";
import WrapperInterface from "./definitions/WrapperInterface";
import TranslateVariablesInterface from "./definitions/TranslateVariablesInterface";
import Wrapper, { WrapperProps } from "./components/Table/components/Wrapper";
import Table, { TableProps } from "./components/Table/components/Table";
import TableActions, { TableActionsProps } from "./components/Table/components/TableActions";
import TableContent, { TableContentProps } from "./components/Table/components/TableContent";
import TableFilters, { TableFiltersProps } from "./components/Table/components/TableFilters";
import TableFiltersFieldset, { TableFiltersFieldsetProps } from "./components/Table/components/TableFiltersFieldset";
import TableFiltersButtons from "./components/Table/components/TableFiltersButtons";
import TablePagination from "./components/Table/components/TablePagination";
import TablePaginationActions from "./components/Table/components/TablePaginationActions";
import TextColumn, { TextColumnProps } from "./components/Table/columns/TextColumn";
import TextTruncateColumn, { TextTruncateColumnProps } from "./components/Table/columns/TextTruncateColumn";
import BooleanColumn, { BooleanColumnProps } from "./components/Table/columns/BooleanColumn";
import ConstColumn, { ConstColumnProps } from "./components/Table/columns/ConstColumn";
import RepresentationColumn, { RepresentationColumnProps } from "./components/Table/columns/RepresentationColumn";
import DateColumn, { DateColumnProps } from "./components/Table/columns/DateColumn";
import DateTimeColumn, { DateTimeColumnProps } from "./components/Table/columns/DateTimeColumn";
import TimeColumn, { TimeColumnProps } from "./components/Table/columns/TimeColumn";
import ActionsColumn, { ActionsColumnProps } from "./components/Table/columns/ActionsColumn";
import ResultButton, { ResultButtonProps } from "./components/Table/actions/result/ResultButton";
import ResultButtonOnClick, { ResultButtonOnClickProps } from "./components/Table/actions/result/ResultButtonOnClick";
import ResultButtonLink, { ResultButtonLinkProps } from "./components/Table/actions/result/ResultButtonLink";
import ResultButtonDownload, {
    ResultButtonDownloadProps,
} from "./components/Table/actions/result/ResultButtonDownload";
import ResultButtonEndpoint, {
    ResultButtonEndpointProps,
} from "./components/Table/actions/result/ResultButtonEndpoint";
import ResultButtonEndpointConfirmation, {
    ResultButtonEndpointConfirmationProps,
} from "./components/Table/actions/result/ResultButtonEndpointConfirmation";
import Edit, { EditProps } from "./components/Table/actions/result/Edit";
import Delete, { DeleteProps } from "./components/Table/actions/result/Delete";
import Create, { CreateProps } from "./components/Table/actions/table/Create";
import ExportCsv, { ExportCsvProps } from "./components/Table/actions/table/ExportCsv";
import ExportExcel, { ExportExcelProps } from "./components/Table/actions/table/ExportExcel";
import EditTableColumns, {
    EditTableColumnsProps,
    EditTableColumnsSortableColumn,
} from "./components/Table/actions/table/EditTableColumns";
import Batch, { BatchProps } from "./components/Table/actions/table/Batch";
import BatchDelete, { BatchDeleteProps } from "./components/Table/actions/table/BatchDelete";
// TODO
// import BatchForm, { BatchFormProps } from "./components/Table/actions/table/BatchForm";
import BatchQueryInterface from "./components/Table/definitions/BatchQueryInterface";
import BatchSelectedType from "./components/Table/definitions/BatchSelectedType";
import DeniedAccessBehaviorType from "./components/Table/definitions/DeniedAccessBehaviorType";
import DeniedAccessInterface from "./components/Table/definitions/DeniedAccessInterface";
import DeniedAccessListInterface from "./components/Table/definitions/DeniedAccessListInterface";
import FiltersInterface from "./components/Table/definitions/FiltersInterface";
import FilterType from "./components/Table/definitions/FilterType";
import FilterValuesInterface from "./components/Table/definitions/FilterValuesInterface";
import ResultInterface from "./components/Table/definitions/ResultInterface";
import RowInterface from "./components/Table/definitions/RowInterface";
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
import TableColumnDefaultHideInterface from "./components/Table/definitions/TableColumnDefaultHideInterface";
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
import RadioApiFilter, { RadioApiFilterProps } from "./components/Table/filters/RadioApiFilter";
import BooleanFilter, { BooleanFilterProps } from "./components/Table/filters/BooleanFilter";
import SelectFilter, { SelectFilterProps } from "./components/Table/filters/SelectFilter";
import SelectApiFilter, { SelectApiFilterProps } from "./components/Table/filters/SelectApiFilter";
import SelectAutocompleteApiFilter, {
    SelectAutocompleteApiFilterProps,
} from "./components/Table/filters/SelectAutocompleteApiFilter";
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
import ValidationSchemaInterface from "./components/Form/definitions/ValidationSchemaInterface";
import FieldValidationSchemaType from "./components/Form/definitions/FieldValidationSchemaType";
import Form, { FormProps } from "./components/Form/components/Form";
import FormContent, { FormContentProps } from "./components/Form/components/FormContent";
import OptionsType from "./components/Form/definitions/OptionsType";
import OptionInterface from "./components/Form/definitions/OptionInterface";
import TextFieldInterface from "./components/Form/definitions/TextFieldInterface";
import TextFieldPlaceholderInterface from "./components/Form/definitions/TextFieldPlaceholderInterface";
import Radio, { RadioProps } from "./components/Form/fields/Radio";
import RadioApi, { RadioApiProps } from "./components/Form/fields/RadioApi";
import RadioElement, { RadioElementProps } from "./components/Form/elements/RadioElement";
import Boolean, { BooleanProps } from "./components/Form/fields/Boolean";
import BooleanElement, { BooleanElementProps } from "./components/Form/elements/BooleanElement";
import Select, { SelectProps } from "./components/Form/fields/Select";
import SelectApi, { SelectApiProps } from "./components/Form/fields/SelectApi";
import SelectAutocompleteApi, { SelectAutocompleteApiProps } from "./components/Form/fields/SelectAutocompleteApi";
import SelectElement, {
    SelectElementProps,
    SelectElementSpecificProps,
    SelectElementAutocompleteProps,
    SelectElementAutocompleteOptionalProps,
} from "./components/Form/elements/SelectElement";
import Multiselect, { MultiselectProps } from "./components/Form/fields/Multiselect";
import MultiselectApi, { MultiselectApiProps } from "./components/Form/fields/MultiselectApi";
import MultiselectAutocompleteApi, {
    MultiselectAutocompleteApiProps,
} from "./components/Form/fields/MultiselectAutocompleteApi";
import MultiselectElement, {
    MultiselectElementProps,
    MultiselectElementSpecificProps,
    MultiselectElementAutocompleteProps,
    MultiselectElementAutocompleteOptionalProps,
} from "./components/Form/elements/MultiselectElement";
import { SelectValueType } from "./components/Form/definitions/AutocompleteTypes";
import FieldHelpType from "./components/Form/definitions/FieldHelpType";
import FieldElementInterface from "./components/Form/definitions/FieldElementInterface";
import FieldElementPlaceholderInterface from "./components/Form/definitions/FieldElementPlaceholderInterface";
import Textarea, { TextareaProps } from "./components/Form/fields/Textarea";
import TextareaElement, {
    TextareaElementProps,
    TextareaElementSpecificProps,
} from "./components/Form/elements/TextareaElement";
import Rating, { RatingProps } from "./components/Form/fields/Rating";
import RatingElement, {
    RatingElementProps,
    RatingElementSpecificProps,
} from "./components/Form/elements/RatingElement";
import Text, { TextProps } from "./components/Form/fields/Text";
import TextElement, { TextElementProps, TextElementSpecificProps } from "./components/Form/elements/TextElement";
import Email, { EmailProps } from "./components/Form/fields/Email";
import EmailElement, { EmailElementProps, EmailElementSpecificProps } from "./components/Form/elements/EmailElement";
import Password, { PasswordProps } from "./components/Form/fields/Password";
import PasswordElement, {
    PasswordElementProps,
    PasswordElementSpecificProps,
} from "./components/Form/elements/PasswordElement";
import Date, { DateProps } from "./components/Form/fields/Date";
import DateElement, { DateElementProps, DateElementSpecificProps } from "./components/Form/elements/DateElement";
import DateTime, { DateTimeProps } from "./components/Form/fields/DateTime";
import DateTimeElement, {
    DateTimeElementProps,
    DateTimeElementSpecificProps,
} from "./components/Form/elements/DateTimeElement";
import Time, { TimeProps } from "./components/Form/fields/Time";
import TimeElement, { TimeElementProps, TimeElementSpecificProps } from "./components/Form/elements/TimeElement";
import Checkbox, { CheckboxProps } from "./components/Form/fields/Checkbox";
import CheckboxElement, {
    CheckboxElementProps,
    CheckboxElementSpecificProps,
} from "./components/Form/elements/CheckboxElement";
import Collection, { CollectionProps } from "./components/Form/fields/Collection";
import {
    resolveAnyOrFunction,
    resolveBooleanOrFunction,
    resolveStringOrFunction,
    resolveReactNodeOrFunction,
    resolveAxiosRequestConfigOrFunction,
} from "./utils/resolve";
import { renderField, filterInitialValues, transformInitialValues } from "./utils/common";
import { Optional } from "./utils/TypescriptOperators";
export {
    Button,
    ButtonProps,
    ButtonLink,
    ButtonLinkProps,
    ButtonDownload,
    ButtonDownloadProps,
    ButtonEndpoint,
    ButtonEndpointProps,
    ButtonEndpointConfirmation,
    ButtonEndpointConfirmationProps,
    // TODO
    // ButtonDialogForm,
    // ButtonDialogFormProps,
    IconButton,
    IconButtonProps,
    IconButtonLink,
    IconButtonLinkProps,
    IconButtonDownload,
    IconButtonDownloadProps,
    IconButtonEndpoint,
    IconButtonEndpointProps,
    IconButtonEndpointConfirmation,
    IconButtonEndpointConfirmationProps,
    // TODO
    // IconButtonDialogForm,
    // IconButtonDialogFormProps,
    AppDateFnsUtils,
    Wrapper,
    WrapperProps,
    WrapperInterface,
    TranslateVariablesInterface,
    Table,
    TableProps,
    TableActions,
    TableActionsProps,
    TableContent,
    TableContentProps,
    TableFilters,
    TableFiltersProps,
    TableFiltersFieldset,
    TableFiltersFieldsetProps,
    TableFiltersButtons,
    TablePagination,
    TablePaginationActions,
    BatchQueryInterface,
    BatchSelectedType,
    DeniedAccessBehaviorType,
    DeniedAccessInterface,
    DeniedAccessListInterface,
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
    ConstColumn,
    ConstColumnProps,
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
    ResultButtonOnClick,
    ResultButtonOnClickProps,
    ResultButtonLink,
    ResultButtonLinkProps,
    ResultButtonDownload,
    ResultButtonDownloadProps,
    ResultButtonEndpoint,
    ResultButtonEndpointProps,
    ResultButtonEndpointConfirmation,
    ResultButtonEndpointConfirmationProps,
    Edit,
    EditProps,
    Delete,
    DeleteProps,
    Create,
    CreateProps,
    ExportCsv,
    ExportCsvProps,
    ExportExcel,
    ExportExcelProps,
    EditTableColumns,
    EditTableColumnsProps,
    EditTableColumnsSortableColumn,
    Batch,
    BatchProps,
    BatchDelete,
    BatchDeleteProps,
    // TODO
    // BatchForm,
    // BatchFormProps,
    RowInterface,
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
    TableColumnDefaultHideInterface,
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
    RadioApiFilter,
    RadioApiFilterProps,
    BooleanFilter,
    BooleanFilterProps,
    SelectFilter,
    SelectFilterProps,
    SelectApiFilter,
    SelectApiFilterProps,
    SelectAutocompleteApiFilter,
    SelectAutocompleteApiFilterProps,
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
    ValidationSchemaInterface,
    FieldValidationSchemaType,
    Form,
    FormProps,
    FormContent,
    FormContentProps,
    OptionsType,
    OptionInterface,
    TextFieldInterface,
    TextFieldPlaceholderInterface,
    FieldElementInterface,
    FieldElementPlaceholderInterface,
    FieldHelpType,
    Radio,
    RadioProps,
    RadioApi,
    RadioApiProps,
    RadioElement,
    RadioElementProps,
    Boolean,
    BooleanProps,
    BooleanElement,
    BooleanElementProps,
    Select,
    SelectProps,
    SelectApi,
    SelectApiProps,
    SelectAutocompleteApi,
    SelectAutocompleteApiProps,
    SelectElement,
    SelectElementProps,
    SelectElementSpecificProps,
    SelectElementAutocompleteProps,
    SelectElementAutocompleteOptionalProps,
    Multiselect,
    MultiselectProps,
    MultiselectApi,
    MultiselectApiProps,
    MultiselectAutocompleteApi,
    MultiselectAutocompleteApiProps,
    MultiselectElement,
    MultiselectElementProps,
    MultiselectElementSpecificProps,
    MultiselectElementAutocompleteProps,
    MultiselectElementAutocompleteOptionalProps,
    SelectValueType,
    Textarea,
    TextareaProps,
    TextareaElement,
    TextareaElementProps,
    TextareaElementSpecificProps,
    Rating,
    RatingProps,
    RatingElement,
    RatingElementProps,
    RatingElementSpecificProps,
    Text,
    TextProps,
    TextElement,
    TextElementProps,
    TextElementSpecificProps,
    Email,
    EmailProps,
    EmailElement,
    EmailElementProps,
    EmailElementSpecificProps,
    Password,
    PasswordProps,
    PasswordElement,
    PasswordElementProps,
    PasswordElementSpecificProps,
    Date,
    DateProps,
    DateElement,
    DateElementProps,
    DateElementSpecificProps,
    DateTime,
    DateTimeProps,
    DateTimeElement,
    DateTimeElementProps,
    DateTimeElementSpecificProps,
    Time,
    TimeProps,
    TimeElement,
    TimeElementProps,
    TimeElementSpecificProps,
    Checkbox,
    CheckboxProps,
    CheckboxElement,
    CheckboxElementProps,
    CheckboxElementSpecificProps,
    Collection,
    CollectionProps,
    resolveAnyOrFunction,
    resolveBooleanOrFunction,
    resolveStringOrFunction,
    resolveReactNodeOrFunction,
    resolveAxiosRequestConfigOrFunction,
    renderField,
    filterInitialValues,
    transformInitialValues,
    Optional,
};
