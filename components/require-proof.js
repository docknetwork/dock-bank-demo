import React, { useState, useEffect } from 'react';
import axios from 'axios';

import QRDisplay from 'components/qr';

const CHECK_PROOF_INTERVAL = 5000;

export default function RequireProof({ onPresentedProof, type }) {
  const [proofRequest, setProofRequest] = useState();

  async function getProofRequest() {
    const { data } = await axios.get(`/api/proof-request?type=${type}`);

    if (!proofRequest) {
      setProofRequest(data);
      setTimeout(() => checkProofRequest(data), CHECK_PROOF_INTERVAL);
    }
  }

  async function checkProofRequest(request) {
    const { data } = await axios.get(`/api/proof-request?id=${request.id}`);
    const { verified } = data;

    if (verified) {
      onPresentedProof(data);
    } else {
      setTimeout(() => checkProofRequest(request), CHECK_PROOF_INTERVAL);
    }
  }

  useEffect(() => {
    if (!proofRequest) {
      getProofRequest();
    }
  }, [proofRequest]);

  return proofRequest ? (
    <QRDisplay value={proofRequest.qr} />
  ) : (
    <QRDisplay />
  );
}
