import { Button } from "../ui/button";
import FormController from "./FormController";

const CommonForm = ({
  handleFormSubmit,
  buttonText,
  formControls = [],
  formData,
  setFormData,
  isButtonDisabled = false,
}) => {
  return (
    <form onSubmit={handleFormSubmit}>
      {/* render form controller here  */}
      <FormController
        formControls={formControls}
        formData={formData}
        setFormData={setFormData}
        buttonText={buttonText}
      />
      <Button className="mt-4 w-full" type="submit" disabled={isButtonDisabled}>
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
