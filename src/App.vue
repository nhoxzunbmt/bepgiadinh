<template>
  <div>
        <!--[if lt IE 10]>
      <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->

<!-- Header -->  
<header id="header" class="header mm-slideout">
  <div class="menu-logo clearfix">
    <div class="container">
      <div class="menu-logo row">
        <div class="col-2 col-md-auto text-left">
          <a class="tab-navTop js-offcanvas-trigger" href="#off-canvas-left-o">
            <img src="images/img-icon-menu.png" alt="Menu" class="img-fluid" width="30">
          </a>
        </div>
        <div class="col-10 col-lg-10 text-center logo-bgd">
          <img src="images/logo-bgd.png" alt="Logo Bep Gia Dinh" class="img-fluid">
        </div>
      </div><!-- menu-logo -->
    </div><!-- container -->
    <div class="" id="off-canvas-left-o">
      <ul class="navbar-nav" id="navbarTop"> 
        <li class="nav-item">
          <a class="nav-link__a active" href="#">
            <i class="icon-menu icon-recipe-01"><img src="images/img-icon-menu-recipe-01.png" alt=""></i> Làm bánh
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link__a" href="#">
            <i><img src="images/img-icon-menu-recipe-02.png" alt=""></i> Món ăn vặt
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link__a" href="#">
            <i><img src="images/img-icon-menu-recipe-03.png" alt=""></i> Món chay
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link__a" href="#">
            <i><img src="images/img-icon-menu-recipe-04.png" alt=""></i> Món mặn
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link__a" href="#">
            <i><img src="images/img-icon-menu-recipe-05.png" alt=""></i> Món cuối tuần
          </a>
        </li>
        <li class="mm-multiline">NGUYÊN LIỆU</li>
        <li class="nav-item">
          <a class="nav-link__a" href="#">
            <i><img width="35" src="images/img-icon-menu-recipe-06.png" alt=""></i> Heo
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link__a" href="#">
            <i><img width="35" src="images/img-icon-menu-recipe-07.png" alt=""></i> Bò
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link__a" href="#">
            <i><img width="35" src="images/img-icon-menu-recipe-08.png" alt=""></i> Gia cầm
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link__a" href="#">
            <i><img width="35" src="images/img-icon-menu-recipe-09.png" alt=""></i> Thủy / Hải sản
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link__a" href="#">
            <i><img width="35" src="images/img-icon-menu-recipe-10.png" alt=""></i> Đậu hũ
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link__a" href="#">
            <i><img width="35" src="images/img-icon-menu-recipe-11.png" alt=""></i> Cừu
          </a>
        </li>
      </ul>
    </div>
  </div><!-- menu-logo -->
  
  <div class="wrap-search">
    <div class="container">
      <form class="search-form clearfix">
        <button class="btn-search float-left" type="submit">
          <img src="images/img-icon-search.png" class="img-fluid" alt="Search">
        </button>
        <input type="text" placeholder="Tìm kiếm" id="" name="s" value="" class="text-search float-left w-75">
      </form>
    </div>
  </div><!-- wrap-search -->
</header><!-- /header --><!-- /Header -->

  <main class="main">
    <div class="card first-card">
      <div class="card-thumb">
        <img src="images/img-thumb-ex.png" alt="Thumb" class="img-fluid">
        <span class="card-thumb__name">
          <img src="images/img-icon-menu-recipe-08.png" alt="Chicken" class="img-fluid" width="35">
          <span class="post-thumb__desc">Nguyên liệu: gà</span>
        </span>
      </div>
      <div class="container">
        <div class="card-body">
          <h5 class="card-title">
            <a class="card-title__name">Cơm chiên gà nướng xá xíu</a>
            <a class="card-mess">6</a>
          </h5>
          <p class="card-text text-center">
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </p>
        </div>
      </div>
    </div><!-- card -->

    <div class="card">
      <div class="card-thumb">
        <img src="images/img-thumb-ex.png" alt="Thumb" class="img-fluid">
        <span class="card-thumb__name">
          <img src="images/img-icon-menu-recipe-08.png" alt="Chicken" class="img-fluid" width="35">
          <span class="post-thumb__desc">Nguyên liệu: gà</span>
        </span>
      </div>
      <div class="container">
        <div class="card-body">
          <h5 class="card-title">
            <a class="card-title__name">Cơm chiên gà nướng xá xíu</a>
            <a class="card-mess">6</a>
          </h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </p>
        </div>
      </div>
    </div><!-- card -->

    
    <a class="back-to-top"><img src="images/img-icon-back-to-top.png" alt="Icon arrow" width="30" class=""></a>
  </main><!-- main -->

<!-- Footer -->
<footer class="footer">
  
</footer><!-- /Footer -->
  </div>
</template>

<script>
  export default {

  }
</script>
