<div id="toastNotice" class="toast fade position-fixed" role="alert" style="top:5%;left:0;right:0;margin:auto;z-index:1200" aria-live="assertive" aria-atomic="true" data-autohide="false">
  <div class="toast-header">
    <img src="../assets/favicon.png" class="me-2" alt="">
    <strong class="me-auto">Warning</strong>
    <small></small>
    <button type="button" class="btn-close closeBlur" data-dismiss="toast" aria-label="Close"></button>
  </div>
  <div class="toast-body">
   	<p>You are not logged in. You still have full access to this activity. However, your progress will not be saved across different devices and you will be unable to share your progress with your teacher by joining a class.</p>
    <p><a href="#" class="btn btn-primary my-2 showLogin" data-dismiss="toast" >Sign in/Register now</a>
    <button type="button" class="btn btn-secondary my-2 closeBlur" data-dismiss="toast" aria-label="Close">Continue without signing in</button>
    </p>
  </div>
</div>

<script>
	$(document).ready(function(){
    	$(".toast").toast('show');
		$("#loginbg").show();
	});
	
	$(function() {
		$(".closeBlur").click(function() {
			$("#loginoverlay").hide();
			$("#loginbg").hide();
			$(".toast").toast('hide');
		})
	});
</script>