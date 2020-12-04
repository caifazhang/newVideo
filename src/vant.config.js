import {
  Button,
  Swipe,
  SwipeItem,
  Lazyload,
  Toast,
  Search,
  ShareSheet,
  Col,
  Row,
  List,
  Divider,
  Form,
  Field,
  Popup,
  NavBar,
  GoodsAction,
  GoodsActionIcon,
  Icon,
  Collapse,
  CollapseItem,
  DropdownMenu,
  DropdownItem,
  Uploader,
  Cell,
  Empty,
  Dialog 
} from "vant";

const vants = [
  Button,
  Swipe,
  SwipeItem,
  Lazyload,
  Toast,
  Search,
  ShareSheet,
  Col,
  Row,
  List,
  Divider,
  Form,
  Field,
  Popup,
  NavBar,
  GoodsAction,
  GoodsActionIcon,
  Icon,
  Collapse,
  CollapseItem,
  DropdownMenu,
  DropdownItem,
  Uploader,
  Cell,
  Empty,
  Dialog 
];

export default {
  install(Vue) {
    vants.forEach((comment) => {
      Vue.use(comment);
    });
  },
};
