import { forwardRef } from "react";
import { FormInputsDetail } from "../../components/form/formInput";
import { FormBtns } from "../../components/form/formBtn";

const PopupForm = forwardRef((props, ref) => {
  // Function to stop propagation for clicks inside the popup content
  const handleContentClick = (e) => {
    e.stopPropagation(); // Prevents clicks within the content from closing the popup
  };

  return (
    // Overlay: Closes the popup when clicked
    <div 
      className="fixed top-0 left-0 z-[1700] w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
      onClick={props.closePopup}>
      
      {/* Content Area: Does not propagate clicks to the overlay */}
      <div className="bg-white rounded-lg shadow-xl w-[80%] max-w-[20rem]" onClick={handleContentClick}>
        <div className="p-8 text-center">
          <h3 className="text-lg font-bold mb-4 text-center">{props?.title}</h3>
          <p className="mb-2">{props?.message}</p>
          <div className="space-y-4">
            <FormInputsDetail inputs={props?.inputs}/>
            <div className="flex flex-row gap-2 justify-end">
              <FormBtns buttons={props?.buttons}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PopupForm;
