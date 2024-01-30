import React from 'react';
import PropTypes from 'prop-types';

import BaseModal from './BaseModal';
import FormWrapper from '../FormWrapper';
import FormSubmit from '../buttons/FormSubmit';
import Text from '../inputs/Text';
import HorizontalGroup from '../inputs/HorizontalGroup';
import Date from '../inputs/Date';
import Money from '../inputs/Money';
import TextArea from '../inputs/TextArea';
import {getDateToday} from '../../helpers/misc-getters-helps';

const JobsModal = ({show, setShow, onSubmit}) => {
  return (
    <BaseModal title="New Job" {...{show, setShow}}>
      <FormWrapper data={{dateApplied: getDateToday()}} {...{onSubmit}}>
        <Text label="Company Name" placeholder="Company Name..."/>
        <HorizontalGroup>
          <Text label="Position"/>
          <Text label="Location"/>
        </HorizontalGroup>
        <HorizontalGroup>
          <Date label="Date Applied"/>
          <Money label="Range Max"/>
          <Money label="Range Min"/>
        </HorizontalGroup>
        <TextArea label='Company Summary'/>
        <TextArea label='Tasks'/>
        <TextArea label='Requirements'/>
        <TextArea label='Benefits'/>
        <FormSubmit/>
      </FormWrapper>
    </BaseModal>
  );
};

JobsModal.propTypes = {
  header: PropTypes.array,
  show: PropTypes.bool,
  setShow: PropTypes.func,
  onSubmit: PropTypes.func
};

export default JobsModal;
