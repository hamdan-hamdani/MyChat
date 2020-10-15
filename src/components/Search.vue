<template>
    <div class="search">
        <div class="inp-search">
            <div class="inputMsg">
                <label for="msg"><img src="../assets/search-solid.png" alt=""></label>
            </div>
            <div class="input">
                <input type="text" name="" id="msg" placeholder="Type your message">
            </div>
        </div>
        <div class="add">
            <div><img src="../assets/plus-solid.png" alt=""></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Search'
}
</script>

<style scoped>
.search {
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
}
.inp-search {
    flex: 2;
    display: flex;
    background-color:  #E5E5E5;
    border-radius: 10px;
    padding: 10px;
}
.inputMsg {
    flex: 0.2;
    margin-right: 10px;
}
.inputMsg img {
    width: 100%;
    object-fit: cover;
}
.input {
    flex: 3;
}
.input input {
    border: none;
    background-color:  #E5E5E5;
}
.add {
    flex: 0.1;
    padding: 10px;
    padding-right: 0;
}
.add img {
    width: 100%;
    object-fit: cover;
}
</style>
