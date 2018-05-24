<template>
      <Layout  class="layout" id="app">
          <Header v-show="IsLogined" :style="headerStyle">
            <Row>
              <Col>
                您好，{{Name}}，
                <ButtonGroup>
                  <Button type="primary" @click="info">个人信息</Button>
                  <Button type="error" @click="logout">
                    <Icon type="android-exit"></Icon>
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
          </Header>
          <Layout>
              <Sider v-show="IsLogined"  breakpoint="md" :width="150" collapsible :style="{background: '#fff'}" ref="menu"  v-model="isCollapsed">
                  <Menu active-name="1-2" theme="light" width="150px" :style="MenuStyle" :open-names="['1']" @on-select="menuSelect" accordion>
                      <Submenu v-for="(v,k) in Menus" v-bind:key="k" :name="v.Router">
                          <template slot="title">
                              <Icon type="ios-navigate"></Icon>
                              {{v.Name}}
                          </template>
                          <MenuItem v-for="(s,o) in v.Subs" v-bind:key="o" :name="s.Router">{{s.Name}}</MenuItem>
                      </Submenu>
                  </Menu>
              </Sider>
              <Layout :style="{padding: '0 5px 5px'}">
                  <Content :style="{margin: '2px',padding:'1px', background: '#fff', minHeight: '220px'}">
                     <router-view></router-view>
                  </Content>
                  <Footer style="padding:0;margin:0">{{footer}}</Footer>
              </Layout>
          </Layout>
      </Layout>
</template>

<script lang='ts'>
import Vue from "./vue";
import Component from "vue-class-component";
import { Getter, Action } from "vuex-class";
// import Menu from "./components/Menu.vue";
// import { M_SHOW_MENU, A_MENU } from "./store/modules/Menu";
// import { A_LOGIN, A_SELECT, M_LOGIN, EmptyUsers } from "./store/modules/Users";
import { clone } from "./store/IFace";
import { RouterPath } from "./router/index";
import { A_SELECTED, A_RELOGIN,A_LOGOUT, A_LOGIN_SUCCESS } from "./store/base/Login";
@Component({
  components: {
    // Menu
  }
})
export default class App extends Vue {
  footer: string = "";
  isCollapsed: Boolean = false;
  get IsLogined() {
    return this.$store.getters.G_UID > 0;
  }
  get Menus() {
    return this.$store.state.Menu.Menus;
  }
  get MenuStyle(){
      return {
          height:(window.screen.height-40)+'px',
          'overflow-y':'scroll'
      }
  }
  get Name() {
    return this.$store.state.Login.User.Name;
  }
  loading = "";
  showMenu() {
    // this.$store.commit(M_SHOW_MENU, true);
  }
  menuSelect(path: string) {
    this.$router.push(path);
  }

  //个人信息按钮
  info(){
    this.$router.push('/Info');
  }

  created() {
    // this.$store.dispatch(A_RELOGIN);
    // this.$store.dispatch(A_LOGIN_SUCCESS,{
    //   UID:1,
    //   Name:'',
    //   Sex:0,
    // })
  }
  logout() {
    this.$Message.success('请登录')
    this.$store.dispatch(A_LOGOUT)
    // this.$router.push(clone(RouterPath.Login))
  }
  get headerStyle(){
    return {
      'line-height':window.screen.width<1024?'initial':'38px',
      height:'auto',
      padding:'3px'
    }
  }
}
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #ffffff;
  /*margin-top: 20px;*/
}
.layout {
  height: 100vh;
}
</style>
