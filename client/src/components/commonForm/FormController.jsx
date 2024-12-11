import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const FormController = ({ formControls = [], formData, setFormData }) => {
  // Helper function to render components dynamically
  const renderComponentByType = (getControlItem) => {
    let currentControlledItemValue = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        return (
          <Input
            id={getControlItem.name}
            name={getControlItem.name}
            type={getControlItem.type}
            placeholder={getControlItem.placeholder}
            value={currentControlledItemValue}
            onChange={(e) => {
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              });
            }}
          />
        );

      case "select":
        return (
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, [getControlItem.name]: value })
            }
            value={formData[getControlItem.name] || ""}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options?.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "textarea":
        return (
          <Textarea
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            value={currentControlledItemValue}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );

      default:
        return (
          <Input
            id={getControlItem.name}
            name={getControlItem.name}
            type={getControlItem.type}
            placeholder={getControlItem.placeholder}
            value={currentControlledItemValue}
            onChange={(e) => {
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              });
            }}
          />
        );
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {formControls.map((control) => (
        <div className="flex flex-col gap-1" key={control.name}>
          <Label htmlFor={control.name}>{control.label}</Label>
          {renderComponentByType(control)}
        </div>
      ))}
    </div>
  );
};

export default FormController;
