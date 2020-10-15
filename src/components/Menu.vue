<template>
    <div class="menu">
        <ul>
            <li><div>All</div></li>
            <li><div>Important</div></li>
            <li><div>Unread</div></li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'Menu'
}
</script>

<style scoped>
.menu {
  padding: 20px;
}
.menu ul {
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
}
.menu ul li div{
  padding: 10px 30px;
}
.menu ul li:hover div{
  background: #7E98DF;
  border-radius: 20px;
  box-sizing: border-box;
}
.menu ul li {
  list-style-type: none;
}
</style>
