import React, {useState, useEffect} from 'react';

import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FinanceDisplay from '../finances/FinanceDisplay';
import FinanceConsolidation from '../finances/FinanceConsolidation';
import {getFinances} from '../../actions/finances-actions';

const Finances = () => {

  const [finances, setFinances] = useState(null);
  const [error, setError] = useState(null);

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

  return (
    <>
      {error & <Alert variant='danger'>{error}</Alert>}
      <Row>
        <Col>
          <FinanceDisplay {...{finances}}/>
        </Col>
        <Col>
          <FinanceConsolidation/>
        </Col>
      </Row>
    </>
  );
};

export default Finances;
