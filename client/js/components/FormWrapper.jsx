import React from 'react';
import PropTypes from 'prop-types';

import { FormProvider, useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';

const FormWrapper = ({children, data, debugMode, onSubmit}) => {

  const methods = useForm({
    defaultValues: data
  });

  const {handleSubmit, watch} = methods;

  return (
    <div>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {children}
        </Form>
      </FormProvider>
      {debugMode && <pre>{JSON.stringify(watch(), 0, 2)}</pre>}
      {debugMode && <pre>{JSON.stringify(data, 0, 2)}</pre>}
    </div>
  );
};

FormWrapper.propTypes = {
  children: PropTypes.array,
  data: PropTypes.object,
  debugMode: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired
};

export default FormWrapper;
