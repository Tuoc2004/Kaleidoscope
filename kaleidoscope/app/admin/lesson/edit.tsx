import { SimpleForm, Edit, TextInput, required, ReferenceInput, NumberInput } from "react-admin";

export const LessonEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput 
          source="id" 
          validate={[required()]} 
          label="Id" 
        />
        <ReferenceInput
          source="unitId"
          reference="units"
        />
        <NumberInput
          source="order"
          validate={[required()]}
          label="Order"
        />
      </SimpleForm>
    </Edit>
  );
};