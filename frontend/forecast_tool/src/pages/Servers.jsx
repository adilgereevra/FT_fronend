import { Button, Row, Col  } from "react-bootstrap";
import React from "react";
import { useState, useEffect } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import AddServerModal from './servers/AddServerModal'

registerAllModules();


export const Servers = () => { 
    const [serverData, setServerData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/servers_list/');
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setServerData(data.data);
        } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

        fetchData();
    }, []);

    const initialData = Array.isArray(serverData) ? serverData.map(item => [ 
        item.server_name,
        item.server_url ,
        item.server_status,
        item.description,
        ]) : [];

        const settings = {
            data: initialData,
            rowHeaders: true,
            colHeaders: ['Server Name', 'URL', 'Status', 'Description'],
            height: 'auto',
            width: 'auto',
            columns: [
              { data: 0, type: "text", readOnly: true },
              { data: 1, type: "text", readOnly: true },
              { data: 2, type: "text", readOnly: true },
              { data: 3, type: "text", readOnly: true },
            ],
            colWidths: [150, 250, 250, 150, 250, 250],
            licenseKey: 'non-commercial-and-evaluation',
            filters: true,
            dropdownMenu: true,
          };
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <Row className="mt-3">
                <Col>
                    <Button variant="primary" className="btn-sm" onClick={handleOpenModal} style={{marginLeft: 20}}>Register Server</Button>{' '}
                    <AddServerModal show={showModal} handleClose={handleCloseModal} /> 
                    <AddServerModal />
                </Col>
            </Row>
            <Row className="mt-3">
                <div className='hotTableContainer'>
                    <HotTable settings={settings} />
                </div>
            </Row>
            {/* <Row className="mt-3">
                <Col>
                    <div>
                        <AddServerModal />
                    </div>
                </Col>
            </Row> */}
        </div>
    )
}
