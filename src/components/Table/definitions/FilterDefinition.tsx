import FilterType from "@arteneo/forge/components/Table/definitions/FilterType";

interface FilterDefinition {
    filterBy: string;
    filterType: FilterType;
    // eslint-disable-next-line
    filterValue: any;
}

export default FilterDefinition;
