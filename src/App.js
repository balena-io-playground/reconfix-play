import "./App.css";

import React, {Component} from "react";
import {Textarea, Box, Flex, Divider, Heading} from 'rendition';

import * as temen from 'balena-temen';

class App extends Component {

  constructor () {
    super();

    this.state = {
      json_schema: '',
      errors: ''
    }
  }

  evaluate(value) {
    try {
      const stringify = (value) => JSON.stringify(value, null, 2)
      const parse = (value) => JSON.parse(value)
      const evaluated = stringify( temen.evaluate(parse(value)))
      this.setState({json_schema: evaluated})
      this.setState({errors: ''})
    }
    catch (e) {
      this.setState({json_schema: ''})
      this.setState({errors: e})
    }
  }

  render() {
    return (
      <Box>
        <Box>
          <Heading>Play with reconfix</Heading>
        </Box>
        <Divider/>
        <Box>
          <Flex>
            <Textarea monospace placeholder="yaml" onInput={ event=> this.evaluate(event.target.value) }/>
            <Textarea monospace placeholder="json schema" readOnly={true} value={this.state.json_schema}/>
            <Textarea monospace placeholder="ui object"/>
          </Flex>
        </Box>
        <Box>
          <Flex>
            <Textarea monospace placeholder="errors" readOnly={true} value={this.state.errors} />
          </Flex>
        </Box>
      </Box>
    );
  }
}

export default App;
