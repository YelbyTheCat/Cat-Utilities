import React, {useState, useEffect} from 'react';

import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FinanceDisplay from '../finances/FinanceDisplay';
import FinanceConsolidation from '../finances/FinanceConsolidation';
import {createFinance, getFinances} from '../../actions/finances-actions';
import FinancesModal from '../modals/FinancesModal';
import NewButton from '../buttons/NewButton';

const Finances = () => {

  const [finances, setFinances] = useState(null);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  const fetchFinances = async () => {
    try {
      const res = await getFinances();
      const {data} = res;
      setFinances(data);
      setError(null);
    } catch (e) {
      setError("Couldn't get finances");
    }
  };

  useEffect(() => {
    fetchFinances();
  }, []);

  const onSubmit = async data => {
    setShow(false);
    try {
      const res = await createFinance(data);
      if (res.data) await fetchFinances();
    } catch (e) {
      // Do nothing
      console.error(e);
      setError('Failed to create Finance');
    }
  };

  return (
    <>
      {error && <Alert variant='danger'>{error}</Alert>}
      <NewButton label="New Finance" onClick={() => setShow(true)} size="sm"/>
      <Row>
        <Col>
          <FinanceDisplay {...{finances}}/>
        </Col>
        <Col>
          <FinanceConsolidation/>
        </Col>
      </Row>
      <FinancesModal {...{show, setShow, onSubmit}}/>
    </>
  );
};

export default Finances;
