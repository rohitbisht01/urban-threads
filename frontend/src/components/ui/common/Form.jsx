import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { Input } from "../input";
import { Label } from "../label";
import { Select } from "../select";
import { Textarea } from "../textarea";
import { Button } from "../button";

const Form = ({
  formData,
  formControls,
  setFormData,
  onSubmit,
  buttonText,
}) => {
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            className="focus:outline-none focus:border-transparent"
            name={getControlItem.name}
            type={getControlItem.type}
            id={getControlItem.type}
            placeholder={getControlItem.placeholder}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );
        break;

      case "select":
        element = (
          <Select
            value={value}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => {
                    return (
                      <SelectItem key={optionItem.id} value={optionItem.id}>
                        {optionItem.label}
                      </SelectItem>
                    );
                  })
                : null}
            </SelectContent>
          </Select>
        );
        break;

      case "textarea":
        element = (
          <Textarea
            value={value}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );
        break;

      default:
        element = (
          <Input
            value={value}
            name={getControlItem.name}
            type={getControlItem.type}
            id={getControlItem.type}
            placeholder={getControlItem.placeholder}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div key={controlItem.name} className="grid w-full gap-1.5">
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button className="mt-4 w-full" type="submit">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default Form;
