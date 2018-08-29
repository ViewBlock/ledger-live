// @flow

import React, { Component } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import type { Account } from "@ledgerhq/live-common/lib/types";
import { accountsSelector } from "../../reducers/accounts";
import GenerateMockAccountsButton from "../../components/GenerateMockAccountsButton";
import ImportAccountsButton from "../../components/ImportAccountsButton";
import AccountsIcon from "../../images/icons/Accounts";

import AccountCard from "./AccountCard";
import AccountsHeader from "./AccountsHeader";

const navigationOptions = {
  tabBarIcon: ({ tintColor }: { tintColor: string }) => (
    <AccountsIcon size={18} color={tintColor} />
  ),
};

const mapStateToProps = createStructuredSelector({
  accounts: accountsSelector,
});

type Props = {
  navigation: *,
  accounts: Account[],
};
class Accounts extends Component<Props> {
  static navigationOptions = navigationOptions;

  onAddMockAccount = () => {};

  renderItem = ({ item, index }: { item: Account, index: number }) => (
    <AccountCard
      account={item}
      onPress={() =>
        this.props.navigation.navigate("Account", {
          accountId: item.id,
        })
      }
      style={[styles.accountItem, index === 0 && styles.accountItemFirst]}
    />
  );

  keyExtractor = item => item.id;

  render() {
    const { accounts } = this.props;

    return (
      <View style={styles.root}>
        <AccountsHeader>
          {accounts.length === 0 && (
            <View style={{ padding: 40 }}>
              <GenerateMockAccountsButton title="Generate Mock Accounts" />
              <View style={{ height: 10 }} />
              {/* $FlowFixMe */}
              <ImportAccountsButton title="Import Accounts" />
            </View>
          )}
          <FlatList
            data={accounts}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            style={styles.list}
          />
        </AccountsHeader>
      </View>
    );
  }
}

export default connect(mapStateToProps)(Accounts);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 16,
  },
  accountItem: {
    marginBottom: 10,
  },
  accountItemFirst: {
    marginTop: 10,
  },
});
