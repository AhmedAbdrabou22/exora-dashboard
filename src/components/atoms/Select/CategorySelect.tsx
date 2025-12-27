import { useFormikContext } from "formik";
import Select from "react-select";
import { useFetch } from "../../hooks/useFetch";

type CategoryData = {
    id: number | string;
    name_ar: string;
    name_en?: string;
};

type OptionType = {
    value: number | string;
    label: string;
};

type SelectCategoriesProps = {
    name: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    onCategoryChange?: () => void;
};

export default function SelectCategories({
    name,
    label,
    required,
    onCategoryChange,
    placeholder,
}: SelectCategoriesProps) {
    const { data, isLoading, failureReason } = useFetch<CategoryData[]>({
        queryKey: ["categories"],
        endpoint: `categories?per_page=-1`,
    });

    const { values, setFieldValue } =
        useFormikContext<Record<string, unknown>>();

    const options: OptionType[] = (data?.data?.data || []).map((item) => ({
        value: item.id,
        label: item.name_ar,
    }));

    const selectedValue =
        options.find((option) => option.value === values[name]) || null;

    const handleChange = (option: OptionType | null) => {
        setFieldValue(name, option ? option.value : null);
        onCategoryChange?.();
    };

    return (
        <div className="flex flex-col gap-1 text-right">
            {label && (
                <label className="text-sm font-medium">
                    {label}
                    {required && <span className="text-red-500"> *</span>}
                </label>
            )}

            <Select
                inputId="category-select"
                value={selectedValue}
                onChange={handleChange}
                options={options}
                isClearable
                isDisabled={!isLoading && !!failureReason}
                isLoading={isLoading}
                placeholder={placeholder || ("choose")}
                classNamePrefix="react-select"
                noOptionsMessage={() => ("no_data")}
                loadingMessage={() => ("loading")}
            />
        </div>
    );
}
