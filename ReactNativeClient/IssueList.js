import React, {useState} from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    Button,
    useColorScheme,
    View,
    TouchableOpacity,
    Dimensions,
  } from 'react-native';

  const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

  function jsonDateReviver(key, value) {
    if (dateRegex.test(value)) return new Date(value);
    return value;
  }

  async function graphQLFetch(query, variables = {}) {
    try {
        /****** Q4: Start Coding here. State the correct IP/port******/
        const response = await fetch('http://10.0.2.2:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query, variables })
        /****** Q4: Code Ends here******/
      });
      const body = await response.text();
      const result = JSON.parse(body, jsonDateReviver);
  
      if (result.errors) {
        const error = result.errors[0];
        if (error.extensions.code == 'BAD_USER_INPUT') {
          const details = error.extensions.exception.errors.join('\n ');
          alert(`${error.message}:\n ${details}`);
        } else {
          alert(`${error.extensions.code}: ${error.message}`);
        }
      }
      return result.data;
    } catch (e) {
      alert(`Error in sending data to server: ${e.message}`);
    }
  }

class IssueFilter extends React.Component {
    render() {
      return (
        <>
        {/****** Q1: Start Coding here. ******/}
        <Text>Issue Filter Placeholder</Text>
        {/****** Q1: Code ends here ******/}
        </>
      );
    }
}

const screenWidth = Dimensions.get('window').width;

const width = [
  screenWidth * 0.1,  // ID
  screenWidth * 0.12, // Status
  screenWidth * 0.15, // Owner
  screenWidth * 0.15, // Created
  screenWidth * 0.1,  // Effort
  screenWidth * 0.15, // Due Date
  screenWidth * 0.23  // Title
];

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 10,
    backgroundColor: '#fff'
  },
  table: {
    flex: 1,
    // width: screenWidth - 16,
  },
  header: { 
    height: 50,
    backgroundColor: '#2196F3',
  },
  row: {
    flexDirection: 'row',
    minHeight: 40,
    backgroundColor: '#F5F5F5',
  },
  text: { 
    textAlign: 'center',
    color: '#333',
    padding: 8,
    fontSize: 12,
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
  },
  dataWrapper: { 
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 4,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});


function IssueRow(props) {
    const issue = props.issue;
    {/****** Q2: Coding Starts here. Create a row of data in a variable******/}
    // Create a row of data
    const rowData = [
      issue.id.toString(),
      issue.status,
      issue.owner || '',
      issue.created ? issue.created.toDateString() : '',
      issue.effort !== null ? issue.effort.toString() : '',
      issue.due ? issue.due.toDateString() : '',
      issue.title || '',
    ];
    {/****** Q2: Coding Ends here.******/}
    return (
      <>
      {/****** Q2: Start Coding here. Add Logic to render a row  ******/}
      <Row data={rowData} widthArr={width} style={styles.row} textStyle={styles.text} />
      {/****** Q2: Coding Ends here. ******/}  
      </>
    );
  }
  
  
  function IssueTable(props) {
    const issueRows = props.issues.map(issue =>
      <IssueRow key={issue.id} issue={issue} />
    );

    {/****** Q2: Start Coding here. Add Logic to initalize table header  ******/}
    // Initialize table header
    const tableHead = ['ID', 'Status', 'Owner', 'Created', 'Effort', 'Due Date', 'Title'];
    {/****** Q2: Coding Ends here. ******/}
    
    
    return (
    <View style={styles.container}>
    {/****** Q2: Start Coding here to render the table header/rows.**********/}
      {/* <Table borderStyle={{borderColor: '#C1C0B9'}}>
          <Row data={tableHead} widthArr={width} style={styles.header} textStyle={styles.text} />
          <ScrollView style={styles.dataWrapper}>
            {issueRows}
          </ScrollView>
        </Table> */}
        <Table style={styles.table}>
          <Row 
            data={tableHead} 
            widthArr={width} 
            style={styles.header} 
            textStyle={styles.headerText}
          />
          <ScrollView style={styles.dataWrapper}>
            <Table>
              {issueRows}
            </Table>
          </ScrollView>
        </Table>
    {/****** Q2: Coding Ends here. ******/}
    </View>
    );
  }

  
  export class IssueAdd extends React.Component {
    constructor() {
      super();
      /****** Q3: Start Coding here. Create State to hold inputs******/
      this.state = {
        status: 'New',
        owner: '',
        effort: '',
        due: new Date(new Date().getTime() + 1000*60*60*24*10),
        title: ''
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      /****** Q3: Code Ends here. ******/
    }
  
    /****** Q3: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
    handleStatusChange = (text) => {
      this.setState({ status: text });
    };
  
    handleOwnerChange = (text) => {
      this.setState({ owner: text });
    };
  
    handleEffortChange = (text) => {
      // Ensure effort is a number
      const numericValue = text.replace(/[^0-9]/g, '');
      this.setState({ effort: numericValue });
    };
  
    handleDueChange = (date) => {
      this.setState({ due: date });
    };
  
    handleTitleChange = (text) => {
      this.setState({ title: text });
    };
    /****** Q3: Code Ends here. ******/
    
    handleSubmit() {
      /****** Q3: Start Coding here. Create an issue from state variables and call createIssue. Also, clear input field in front-end******/
      const issue = {
        status: this.state.status,
        owner: this.state.owner,
        effort: parseInt(this.state.effort) || 0,
        due: this.state.due,
        title: this.state.title,
      };
      this.props.route.params.createIssue(issue);
      this.setState({
        status: 'New',
        owner: '',
        effort: '',
        due: new Date(new Date().getTime() + 1000*60*60*24*10),
        title: ''
      });
      this.props.navigation.goBack();  // Return to the issues list after adding
      /****** Q3: Code Ends here. ******/
    }
  
    render() {
      return (
          <View style={styles.container}>
          {/****** Q3: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
          <TextInput
            style={styles.input}
            placeholder="Status (New/Assigned/Fixed/Closed)"
            value={this.state.status}
            onChangeText={this.handleStatusChange}
          />
          <TextInput
            style={styles.input}
            placeholder="Owner"
            value={this.state.owner}
            onChangeText={this.handleOwnerChange}
          />
          <TextInput
            style={styles.input}
            placeholder="Effort (number)"
            value={this.state.effort}
            onChangeText={this.handleEffortChange}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Due Date (YYYY-MM-DD)"
            value={this.state.due.toISOString().split('T')[0]}
            onChangeText={(text) => {
              const date = new Date(text);
              if (!isNaN(date.getTime())) {
                this.handleDueChange(date);
              }
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={this.state.title}
            onChangeText={this.handleTitleChange}
          />
          <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
            <Text style={styles.buttonText}>Add Issue</Text>
          </TouchableOpacity>
          {/****** Q3: Code Ends here. ******/}
          </View>
      );
    }
  }

export class BlackList extends React.Component {
    constructor()
    {   super();
        /****** Q4: Start Coding here. Create State to hold inputs******/
        this.state = { name: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
        /****** Q4: Code Ends here. ******/
    }
    /****** Q4: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
    handleNameChange = (text) => {
      this.setState({ name: text });
    };
    /****** Q4: Code Ends here. ******/

    async handleSubmit() {
    /****** Q4: Start Coding here. Create an issue from state variables and issue a query. Also, clear input field in front-end******/
      const query = `mutation addToBlacklist($name: String!) {
        addToBlacklist(nameInput: $name)
      }`;
      const variables = { name: this.state.name };
      const data = await graphQLFetch(query, variables);
      if (data) {
        alert('Name added to blacklist');
        this.setState({ name: '' });
      }
    /****** Q4: Code Ends here. ******/
    }

    render() {
    return (
        <View>
        {/****** Q4: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
          <TextInput
            style={styles.input}
            placeholder="Name to Blacklist"
            value={this.state.name}
            onChangeText={this.handleNameChange}
          />
          <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
            <Text style={styles.buttonText}>Add to Blacklist</Text>
          </TouchableOpacity>
        {/****** Q4: Code Ends here. ******/}
        </View>
    );
    }
}

export default class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [] };
        this.createIssue = this.createIssue.bind(this);
    }
    
    componentDidMount() {
    this.loadData();
    }

    async loadData() {
    const query = `query {
        issueList {
        id title status owner
        created effort due
        }
    }`;

    const data = await graphQLFetch(query);
    if (data) {
        this.setState({ issues: data.issueList });
    }
    }

    async createIssue(issue) {
    const query = `mutation issueAdd($issue: IssueInputs!) {
        issueAdd(issue: $issue) {
        id
        }
    }`;

    const data = await graphQLFetch(query, { issue });
    if (data) {
        this.loadData();
    }
    }
    
    
    render() {
    return (
      <View style={[styles.container, { flex: 1 }]}>
        {/****** Q1: Start Coding here. ******/}
        <Text style={styles.sectionTitle}>Issue Tracker</Text>
        <IssueFilter />
        {/****** Q1: Code ends here ******/}
      <View style={styles.buttonContainer}>

        {/****** Q3: Start Coding here. ******/}
        <Button
          title="Add Issue"
          onPress={() => this.props.navigation.navigate('AddIssue', {
            createIssue: this.createIssue
          })}
        />
        {/****** Q3: Code Ends here. ******/}
        
        {/****** Q4: Start Coding here. ******/}
        <Button
          title="Blacklist"
          onPress={() => this.props.navigation.navigate('Blacklist')}
        />
        {/****** Q4: Code Ends here. ******/}

      </View>
      {/****** Q2: Start Coding here. ******/}
      <IssueTable issues={this.state.issues} />
      {/****** Q2: Code ends here ******/}
    </View>
    
    );
  }
}
