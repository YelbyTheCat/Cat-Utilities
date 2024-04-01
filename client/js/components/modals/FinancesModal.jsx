import React from 'react';
import PropTypes from 'prop-types';

import BaseModal from './BaseModal';
import FormWrapper from '../FormWrapper';
import Text from '../inputs/Text';
import HorizontalGroup from '../inputs/HorizontalGroup';
import Dropdown from '../inputs/Dropdown';
import Money from '../inputs/Money';
import Date from '../inputs/Date';
import Array from '../inputs/Array';

const FinancesModal = ({show, setShow, onSubmit}) => {
  return (
    <BaseModal title="New Finance" {...{show, setShow}}>
      <FormWrapper debugMode {...{onSubmit}}>
        <HorizontalGroup>
          <Text label="Company Name"/>
          <Date label="Date Spend" property="date"/>
        </HorizontalGroup>
        <HorizontalGroup>
          <Dropdown label="Transaction Type" options={['Debit', 'Credit']}/>
          <Money label="Amount"/>
        </HorizontalGroup>
        <Array label="Details">
          <HorizontalGroup>
            <Text property="name" placeholder="Item"/>
            <Money property="price" placeholder="Price"/>
          </HorizontalGroup>
        </Array>
      </FormWrapper>
    </BaseModal>
  );
};

FinancesModal.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  onSubmit: PropTypes.func
};

export default FinancesModal;
