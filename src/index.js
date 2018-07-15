import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/app";
import 'antd/dist/antd.js';
import 'antd/dist/antd.css';
import { Layout } from 'antd';

const { Header, Footer, Content } = Layout;


ReactDOM.render(
<Layout>
    <Header>
     </Header>
     <Content><App /></Content>
     <Footer>
     <ul>
            <li>EnimaMouss</li>
            <li>Movie App 2018</li>            
     </ul>
     </Footer>
</Layout>, 
document.querySelector(".container"));
